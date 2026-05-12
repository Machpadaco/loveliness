const API = "/api/admin";

// ✅ Protect page (must be logged in)
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

let currentType = "";

/* ================= LOAD FUNCTIONS ================= */

window.loadContact = async function() {
    currentType = "contacts";
    fetchData("contacts");
}

window.loadCounselling = async function() {
    currentType = "counselling";
    fetchData("counselling");
}

window.loadVolunteer = async function() {
    currentType = "volunteers";
    fetchData("volunteers");
}

/* ================= FETCH DATA ================= */

async function fetchData(type) {
    try {
        const res = await fetch(`${API}/${type}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        console.log("Response status:", res.status);

        const data = await res.json();

        if (!res.ok) {
            if (res.status === 401) {
                alert("Session expired. Please login again.");
                window.location.href = "login.html";
                return;
            }
            alert(data.message || "Error loading data");
            return;
        }

        // ✅ Extract actual array
        const actualData = Array.isArray(data)
            ? data
            : (data.data && Array.isArray(data.data) ? data.data : []);

        renderTable(actualData);

    } catch (error) {
        console.error("FETCH ERROR:", error);
        alert("Server error connecting to API. Check if the Render backend is awake.");
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

    headers.forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        theadRow.appendChild(th);
    });

    data.forEach(item => {
        let rowContent = "";
        const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A";

        if (currentType === "contacts") {
            rowContent = `
                <td>${item.name || ''}</td>
                <td>${item.email || ''}</td>
                <td>${item.phone || ''}</td>
                <td>${item.subject || ''}</td>
                <td>${item.message || ''}</td>
                <td>${dateStr}</td>`;
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
                <td>${dateStr}</td>`;
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
                <td>${dateStr}</td>`;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            ${rowContent}
            <td>
                <button class="btn-delete" style="background:#cc0000; color:white; border:none; padding:5px 10px; cursor:pointer;" 
                onclick="deleteItem('${item._id}')">Delete</button>
            </td>`;
        tableBody.appendChild(tr);
    });
}

/* ================= DELETE FUNCTION ================= */

window.deleteItem = async function(id) {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
        let deletePath = currentType;

        // Normalizing plural to singular for backend routes
        if (currentType === "contacts") deletePath = "contact";
        if (currentType === "volunteers") deletePath = "volunteer";
        // ✅ Fixed spelling to 'counselling' (double L)
        if (currentType === "counselling") deletePath = "counselling"; 

        const res = await fetch(`${API}/${deletePath}/${id}`, {
            method: "DELETE",
            headers: {
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
        alert("Server error during deletion");
    }
};

/* ================= LOGOUT ================= */

window.logout = function() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
};

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
    // Initial data load - defaults to contacts
    loadContact();
});