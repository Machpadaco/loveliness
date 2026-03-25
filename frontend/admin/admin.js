const API = "http://127.0.0.1:5000/api/admin";

// ✅ Protect page (must be logged in)
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}

let currentType = "";

/* ================= LOAD FUNCTIONS ================= */

async function loadContact() {
  currentType = "contacts";
  fetchData("contacts");
}

async function loadCounselling() {
  currentType = "counselling";
  fetchData("counselling");
}

async function loadVolunteer() {
  currentType = "volunteers";
  fetchData("volunteers");
}

/* ================= FETCH DATA ================= */

async function fetchData(type) {
  try {
    const res = await fetch(`${API}/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Response status:", res.status);

    const data = await res.json();
    console.log("Raw API Response:", data);

    if (!res.ok) {
      alert(data.message || "Error loading data");
      return;
    }

    // ✅ FIX: Extract actual array
    const actualData = Array.isArray(data)
      ? data
      : (data.data && Array.isArray(data.data) ? data.data : []);

    console.log("Processed Data:", actualData);

    renderTable(actualData);

  } catch (error) {
    console.error("FETCH ERROR:", error);
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

  let headers = [];

  if (currentType === "contacts") {
    headers = ["Name", "Email", "Phone", "Subject", "Message", "Date", "Action"];
  } 
  else if (currentType === "counselling") {
    headers = ["Name", "Email", "Phone", "Country", "Type", "Preferred Contact", "Message", "Date", "Action"];
  } 
  else if (currentType === "volunteers") {
    headers = ["Name", "Email", "Phone", "Country", "Interest", "Availability", "Message", "Date", "Action"];
  }

  // Create table headers
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h;
    theadRow.appendChild(th);
  });

  // Populate rows
  data.forEach(item => {
    let rowContent = "";

    const dateStr = item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : "N/A";

    if (currentType === "contacts") {
      rowContent = `
        <td>${item.name || ''}</td>
        <td>${item.email || ''}</td>
        <td>${item.phone || ''}</td>
        <td>${item.subject || ''}</td>
        <td>${item.message || ''}</td>
        <td>${dateStr}</td>
      `;
    } 
    else if (currentType === "counselling") {
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
    } 
    else if (currentType === "volunteers") {
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

/* ================= DELETE FUNCTION ================= */

window.deleteItem = async function(id) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  try {
    let deletePath = currentType;

    if (currentType === "contacts") deletePath = "contact";
    if (currentType === "volunteers") deletePath = "volunteer";

    const res = await fetch(`${API}/${deletePath}/${id}`, {
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
    console.error("DELETE ERROR:", error);
    alert("Server error during deletion");
  }
};

/* ================= LOGOUT ================= */

window.logout = function() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
};

/* ================= HEADER & FOOTER LOADER ================= */

// Detect correct path
function getBasePath() {
  const path = window.location.pathname;

  // If inside /admin folder → go back one level
  if (path.includes("/admin/")) {
    return "../";
  }

  return "";
}

// Load components
function loadComponent(elementId, fileName) {
  const base = getBasePath();
  const filePath = `${base}components/${fileName}`;

  console.log("Loading:", filePath);

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${fileName}`);
      return res.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;

      // Optional: re-init mobile menu if header
      if (fileName === "header.html") {
        initMobileMenu();
      }
    })
    .catch(err => console.error("Component Error:", err));
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('#mobile-menu');
  const navList = document.querySelector('#nav-list');

  if (menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
      menuBtn.classList.toggle('is-active');
    });
  }
}

// Load on page ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
});