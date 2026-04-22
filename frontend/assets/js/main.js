/**
 * MAIN.JS
 * Handles UI interactions and Admin Dashboard Display.
 * (Form submission logic has been moved to forms.js)
 */

// ✅ Production API URL for Admin tasks
const API_ADMIN = "https://loveliness-backend.onrender.com/api/admin";

/* ================= UI & NAVIGATION ================= */

// Initialize UI elements
document.addEventListener("DOMContentLoaded", () => {
    console.log("Main.js UI Initialized");
    
    // Check if we are on an admin page to auto-load data
    const tableBody = document.getElementById("tableBody");
    if (tableBody) {
        loadContact();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ... your existing code ...

    // 1. Select all "Read More" buttons
    const readMoreBtns = document.querySelectorAll(".read-more-btn");

    readMoreBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // 2. Select the div immediately before this button
            const fullBio = this.previousElementSibling;

            // 3. Check if the content is currently visible
            const isExpanded = fullBio.classList.contains("active");

            if (isExpanded) {
                fullBio.classList.remove("active");
                this.textContent = "Read More";
            } else {
                fullBio.classList.add("active");
                this.textContent = "Read Less";
            }
        });
    });
});

/* ================= ADMIN DASHBOARD LOGIC ================= */

const token = localStorage.getItem("token");

let currentType = "";

// Sidebar/Tab Switchers
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

/* ================= FETCH DATA (ADMIN ONLY) ================= */

async function fetchData(type) {
    if (!token) {
        console.warn("No admin token found.");
        return;
    }

    try {
        const res = await fetch(`${API_ADMIN}/${type}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            if (res.status === 401) {
                alert("Session expired. Please login again.");
                window.location.href = "login.html";
            }
            return;
        }

        const actualData = Array.isArray(data) ? data : (data.data || []);
        renderTable(actualData);

    } catch (error) {
        console.error("Fetch Error:", error);
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
        tableBody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:20px;">No records found.</td></tr>`;
        return;
    }

    // Dynamic Headers
    let headers = [];
    if (currentType === "contacts") headers = ["Name", "Email", "Phone", "Subject", "Message", "Date", "Action"];
    else if (currentType === "counselling") headers = ["Name", "Email", "Phone", "Country", "Type", "Pref.", "Message", "Date", "Action"];
    else if (currentType === "volunteers") headers = ["Name", "Email", "Phone", "Country", "Interest", "Availability", "Message", "Date", "Action"];

    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        theadRow.appendChild(th);
    });

    // Populate Rows
    data.forEach(item => {
        const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A";
        let rowContent = "";

        if (currentType === "contacts") {
            rowContent = `<td>${item.name}</td><td>${item.email}</td><td>${item.phone}</td><td>${item.subject}</td><td>${item.message}</td><td>${dateStr}</td>`;
        } else if (currentType === "counselling") {
            rowContent = `<td>${item.name}</td><td>${item.email}</td><td>${item.phone}</td><td>${item.country}</td><td>${item.counsellingType}</td><td>${item.preferredContact}</td><td>${item.message}</td><td>${dateStr}</td>`;
        } else if (currentType === "volunteers") {
            rowContent = `<td>${item.name}</td><td>${item.email}</td><td>${item.phone}</td><td>${item.country}</td><td>${item.areaOfInterest}</td><td>${item.availability}</td><td>${item.message}</td><td>${dateStr}</td>`;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `${rowContent}<td><button onclick="deleteItem('${item._id}')" style="background:#cc0000; color:white; border:none; padding:5px 10px; cursor:pointer;">Delete</button></td>`;
        tableBody.appendChild(tr);
    });
}

/* ================= DELETE & LOGOUT ================= */

window.deleteItem = async function(id) {
    if (!confirm("Are you sure?")) return;
    try {
        let path = currentType === "contacts" ? "contact" : (currentType === "volunteers" ? "volunteer" : "counselling");
        const res = await fetch(`${API_ADMIN}/${path}/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
            alert("Deleted!");
            fetchData(currentType);
        }
    } catch (err) { alert("Delete failed."); }
};

window.logout = function() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
};