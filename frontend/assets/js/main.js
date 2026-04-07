// ✅ Use 127.0.0.1 for local, but ensure your backend is deployed for Vercel to work
const API = "http://127.0.0.1:5000/api/admin";

/* ================= AUTH PROTECTION ================= */
const token = localStorage.getItem("token");
const isRootPage = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");
const isAdminPage = window.location.pathname.includes("admin.html");

// 💡 FIX: Only redirect if the user is trying to access admin.html without a token
if (isAdminPage && !token) {
    // If we are inside the admin folder, login is in the same folder
    // If we are at the root, login is in admin/login.html
    const loginPath = window.location.pathname.includes("/admin/") ? "login.html" : "admin/login.html";
    window.location.href = loginPath;
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
      if (res.status === 401 || res.status === 403) {
        alert("Session expired. Please login again.");
        window.location.href = "login.html";
        return;
      }
      alert(data.message || `Error ${res.status}: loading data`);
      return;
    }

    const actualData = Array.isArray(data) ? data : (data.data && Array.isArray(data.data) ? data.data : null);

    if (actualData) {
      renderTable(actualData);
    } else {
      console.error("Unexpected response format:", data);
      alert("Invalid data format received from server.");
    }

  } catch (error) {
    console.error("FETCH ERROR:", error);
    // Only alert on admin pages to avoid annoying users on the homepage
    if (isAdminPage) {
      alert("Connection Error: Check if your Node.js server is running.");
    }
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
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding: 20px;">No records found.</td></tr>`;
    return;
  }

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
      rowContent = `<td>${item.name || ''}</td><td>${item.email || ''}</td><td>${item.phone || ''}</td><td>${item.subject || ''}</td><td>${item.message || ''}</td><td>${dateStr}</td>`;
    } else if (currentType === "counselling") {
      rowContent = `<td>${item.name || ''}</td><td>${item.email || ''}</td><td>${item.phone || ''}</td><td>${item.country || ''}</td><td>${item.counsellingType || ''}</td><td>${item.preferredContact || ''}</td><td>${item.message || ''}</td><td>${dateStr}</td>`;
    } else if (currentType === "volunteers") {
      rowContent = `<td>${item.name || ''}</td><td>${item.email || ''}</td><td>${item.phone || ''}</td><td>${item.country || ''}</td><td>${item.areaOfInterest || ''}</td><td>${item.availability || ''}</td><td>${item.message || ""}</td><td>${dateStr}</td>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `${rowContent}<td><button class="btn-delete" style="background:#cc0000; color:white; border:none; padding:5px 10px; cursor:pointer;" onclick="deleteItem('${item._id}')">Delete</button></td>`;
    tableBody.appendChild(tr);
  });
}

/* ================= DELETE ================= */

window.deleteItem = async function(id) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  try {
    let deletePath = currentType;
    if (currentType === "contacts") deletePath = "contact";
    if (currentType === "volunteers") deletePath = "volunteer";
    if (currentType === "counselling") deletePath = "counselling";

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
    fetchData(currentType);
  } catch (error) {
    console.error("DELETE ERROR:", error);
  }
};

/* ================= LOGOUT ================= */

window.logout = function() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
};

/* ================= HEADER & FOOTER LOADERS ================= */

function getBasePath() {
  const path = window.location.pathname;
  // If we are deep inside the admin folder, components are one level up
  if (path.includes("/admin/")) return "../";
  return "./";
}

function loadComponent(elementId, fileName) {
  const base = getBasePath();
  const filePath = `${base}components/${fileName}`;

  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error(`Could not load ${fileName}`);
      return response.text();
    })
    .then(data => {
      const el = document.getElementById(elementId);
      if (el) el.innerHTML = data;
    })
    .catch(err => console.error("Component Error:", err));
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  // Only auto-load data if we are on the admin page
  if (isAdminPage && document.getElementById("tableBody")) {
      loadContact();
  }

  // Load shared layout components
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
});