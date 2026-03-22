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
  table.innerHTML = "";

  if (data.length === 0) {
    table.innerHTML = `<tr><td colspan="4">No data found</td></tr>`;
    return;
  }

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.name || ""}</td>
        <td>${item.email || ""}</td>
        <td>${item.message || item.reason || item.skills || ""}</td>
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