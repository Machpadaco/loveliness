const API = "http://localhost:5000/api/admin";

// ✅ FIXED token key
const token = localStorage.getItem("token");

// ✅ Protect page
if (!token) {
  window.location.href = "login.html";
}

// Keep track of current data type
let currentType = "";

/* ================= LOAD FUNCTIONS ================= */

async function loadContact() {
  currentType = "contact";
  fetchData("contact");
}

async function loadCounselling() {
  currentType = "counselling";
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
        Authorization: `Bearer ${token}` // ✅ FIXED format
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
    alert("Server error");
  }
}

/* ================= RENDER TABLE ================= */

function renderTable(data) {
  const table = document.getElementById("tableBody");
  const thead = document.querySelector("thead tr");

  table.innerHTML = "";
  thead.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `<tr><td colspan="6">No data found</td></tr>`;
    return;
  }

  let headers = [];

  // ✅ Detect type and set headers
  if (currentType === "contact") {
    headers = ["Name", "Email", "Phone", "Subject", "Message", "Date", "Action"];
  }

  if (currentType === "counseling") {
    headers = ["Name", "Email", "Phone", "Country", "Type", "Preferred Contact", "Message", "Date", "Action"];
  }

  if (currentType === "volunteer") {
    headers = ["Name", "Email", "Phone", "Country", "Interest", "Availability", "Message", "Date", "Action"];
  }

  // ✅ Render headers
  headers.forEach(h => {
    thead.innerHTML += `<th>${h}</th>`;
  });

  // ✅ Render rows
  data.forEach(item => {

    let row = "";

    if (currentType === "contact") {
      row = `
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>${item.subject}</td>
        <td>${item.message}</td>
        <td>${new Date(item.createdAt).toLocaleDateString()}</td>
      `;
    }

    if (currentType === "counseling") {
      row = `
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>${item.country}</td>
        <td>${item.counsellingType}</td>
        <td>${item.preferredContact}</td>
        <td>${item.message}</td>
        <td>${new Date(item.createdAt).toLocaleDateString()}</td>
      `;
    }

    if (currentType === "volunteer") {
      row = `
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.phone}</td>
        <td>${item.country}</td>
        <td>${item.areaOfInterest}</td>
        <td>${item.availability}</td>
        <td>${item.message || ""}</td>
        <td>${new Date(item.createdAt).toLocaleDateString()}</td>
      `;
    }

    table.innerHTML += `
      <tr>
        ${row}
        <td>
          <button onclick="deleteItem('${item._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

/* ================= DELETE ================= */

async function deleteItem(id) {
  if (!confirm("Are you sure you want to delete this?")) return;

  try {
    const res = await fetch(`${API}/${currentType}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Delete failed");
      return;
    }

    alert("Deleted successfully");

    // reload current table
    fetchData(currentType);

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
}

/* ================= LOGOUT ================= */

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}