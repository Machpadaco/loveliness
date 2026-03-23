// SEND CONTACT DATA TO BACKEND
async function sendContact(data) {
  return fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

const API = "http://localhost:5000/api/admin";

// ✅ Protect page
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

let currentType = "";

/* ================= LOAD FUNCTIONS ================= */

// These match your backend controller/route naming
async function loadContact() {
  currentType = "contact";
  fetchData("contact");
}

async function loadCounselling() {
  currentType = "counselling"; // ✅ Uses double "ll" to match your backend
  fetchData("counselling");
}

async function loadVolunteer() {
  currentType = "volunteer";
  fetchData("volunteer");
}

/* ================= FETCH DATA ================= */

async function fetchData(type) {
  try {
    const res = await fetch(`${API}/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error loading data");
      return;
    }

    renderTable(data);
  } catch (error) {
    console.error(error);
    alert("Server error connecting to API");
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
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center;">No data found</td></tr>`;
    return;
  }

  // ✅ Set Headers based on type
  let headers = [];
  if (currentType === "contact") {
    headers = ["Name", "Email", "Phone", "Subject", "Message", "Date", "Action"];
  } else if (currentType === "counselling") { // ✅ Matches backend spelling
    headers = ["Name", "Email", "Phone", "Country", "Type", "Preferred Contact", "Message", "Date", "Action"];
  } else if (currentType === "volunteer") {
    headers = ["Name", "Email", "Phone", "Country", "Interest", "Availability", "Message", "Date", "Action"];
  }

  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    theadRow.appendChild(th);
  });

  // ✅ Render Rows
  data.forEach(item => {
    let rowContent = "";
    const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A";

    if (currentType === "contact") {
      rowContent = `
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>${item.phone || ''}</td>
        <td>${item.subject || ''}</td>
        <td>${item.message || ''}</td>
        <td>${dateStr}</td>
      `;
    } else if (currentType === "counselling") { // ✅ Matches backend spelling
      rowContent = `
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>${item.phone || ''}</td>
        <td>${item.country || ''}</td>
        <td>${item.counsellingType || ''}</td>
        <td>${item.preferredContact || ''}</td>
        <td>${item.message || ''}</td>
        <td>${dateStr}</td>
      `;
    } else if (currentType === "volunteer") {
      rowContent = `
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>${item.phone || ''}</td>
        <td>${item.country || ''}</td>
        <td>${item.areaOfInterest || ''}</td>
        <td>${item.availability || ''}</td>
        <td>${item.message || ""}</td>
        <td>${dateStr}</td>
      `;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      ${rowContent}
      <td>
        <button class="btn-delete" onclick="deleteItem('${item._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

/* ================= DELETE ================= */

window.deleteItem = async function(id) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  try {
    const res = await fetch(`${API}/${currentType}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Delete failed");
      return;
    }

    alert("Deleted successfully");
    fetchData(currentType); 
  } catch (error) {
    console.error(error);
    alert("Server error during deletion");
  }
};

/* ================= LOGOUT ================= */

window.logout = function() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
};