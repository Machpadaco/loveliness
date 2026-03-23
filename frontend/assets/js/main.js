// ✅ Use 127.0.0.1 for better compatibility with local development
const API = "http://127.0.0.1:5000/api/admin";

// ✅ Protect page: Redirect if no token is found
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

let currentType = "";

/* ================= LOAD FUNCTIONS ================= */

window.loadContact = async function() {
  currentType = "contacts";
  fetchData("contacts");
};

window.loadCounselling = async function() {
  currentType = "counselling";
  fetchData("counselling");
};

window.loadVolunteer = async function() {
  currentType = "volunteers";
  fetchData("volunteers");
};

/* ================= FETCH DATA ================= */

async function fetchData(type) {
  try {
    const res = await fetch(`${API}/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    console.log(`Fetching ${type} - Status:`, res.status);

    const data = await res.json();
    console.log("API Response:", data);

    if (!res.ok) {
      // If the token is expired or invalid, redirect to login
      if (res.status === 401 || res.status === 403) {
        alert("Session expired. Please login again.");
        window.location.href = "login.html";
        return;
      }
      alert(data.message || `Error ${res.status}: loading data`);
      return;
    }

    // ✅ Flexible Data Handling
    const actualData = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : null);

    if (actualData) {
      renderTable(actualData);
    } else {
      console.error("Unexpected response format:", data);
      alert("Invalid data format received from server.");
    }

  } catch (error) {
    console.error("FETCH ERROR:", error);
    // This alert now tells you if the server is actually reachable
    alert("Connection Error: Check if your Node.js server is running on port 5000.");
  }
}

/* ================= RENDER TABLE ================= */

function renderTable(data) {
  const tableBody = document.getElementById("tableBody");
  const theadRow = document.querySelector("thead tr");

  if (!tableBody || !theadRow) return;

  tableBody.innerHTML = "";
  theadRow.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 20px;">No records found in database.</td></tr>`;
    return;
  }

  // Define Headers based on the active tab
  let headers = [];
  if (currentType === "contacts") {
    headers = ["Name", "Email", "Phone", "Subject", "Message", "Date", "Action"];
  } else if (currentType === "counselling") {
    headers = ["Name", "Email", "Phone", "Country", "Type", "Contact Pref.", "Message", "Date", "Action"];
  } else if (currentType === "volunteers") {
    headers = ["Name", "Email", "Phone", "Country", "Interest", "Availability", "Message", "Date", "Action"];
  }

  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    theadRow.appendChild(th);
  });

  data.forEach(item => {
    const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A";
    let rowContent = "";

    if (currentType === "contacts") {
      rowContent = `
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>${item.phone || ''}</td>
        <td>${item.subject || ''}</td>
        <td>${item.message || ''}</td>
        <td>${dateStr}</td>`;
    } else if (currentType === "counselling") {
      rowContent = `
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>${item.phone || ''}</td>
        <td>${item.country || ''}</td>
        <td>${item.counsellingType || ''}</td>
        <td>${item.preferredContact || ''}</td>
        <td>${item.message || ''}</td>
        <td>${dateStr}</td>`;
    } else if (currentType === "volunteers") {
      rowContent = `
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>${item.phone || ''}</td>
        <td>${item.country || ''}</td>
        <td>${item.areaOfInterest || ''}</td>
        <td>${item.availability || ''}</td>
        <td>${item.message || ""}</td>
        <td>${dateStr}</td>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `${rowContent}
      <td>
        <button class="btn-delete" style="background:#cc0000; color:white; border:none; padding:5px 10px; cursor:pointer;" 
        onclick="deleteItem('${item._id}')">Delete</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

/* ================= DELETE ================= */

window.deleteItem = async function(id) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  try {
    // Ensure the delete path matches your backend (Change to plural if needed)
    let deletePath = currentType; 
    
    const res = await fetch(`${API}/${deletePath}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Delete failed");
      return;
    }

    alert("Deleted successfully");
    fetchData(currentType); // Refresh current list

  } catch (error) {
    console.error("DELETE ERROR:", error);
    alert("Network error during deletion.");
  }
};

/* ================= LOGOUT ================= */

window.logout = function() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
};

// Auto-load contacts on first visit
document.addEventListener("DOMContentLoaded", () => {
    loadContact();
});