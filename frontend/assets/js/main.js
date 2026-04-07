// ✅ API Configuration
const API = "http://127.0.0.1:5000/api/admin";

/* ================= AUTH PROTECTION & PATH LOGIC ================= */
const token = localStorage.getItem("token");
const currentPath = window.location.pathname;

// Check if we are currently inside the "admin" folder
const isInAdminFolder = currentPath.includes("/admin/");
const isAdminDashboard = currentPath.includes("admin.html");

// Protect Admin Dashboard
if (isAdminDashboard && !token) {
    window.location.href = "login.html";
}

/* ================= COMPONENT LOADERS (HEADER/FOOTER) ================= */

/**
 * This function fixes 404s for images and links.
 * It detects if you are in the /admin/ folder and adds "../" to the paths.
 */
function fixRelativePaths(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // If we are in admin folder, we need to go UP one level to find assets
    const prefix = isInAdminFolder ? "../" : "./";

    // 1. Fix all Images (Logo, Social Icons)
    container.querySelectorAll("img").forEach(img => {
        const src = img.getAttribute("src");
        if (src && !src.startsWith("http") && !src.startsWith("/") && !src.startsWith("data:")) {
            img.src = prefix + src;
        }
    });

    // 2. Fix all Navigation Links
    container.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("/")) {
            link.href = prefix + href;
        }
    });
}

function loadComponent(elementId, fileName) {
    // Determine where the 'components' folder is relative to the current page
    const base = isInAdminFolder ? "../" : "./";
    const filePath = `${base}components/${fileName}`;

    fetch(filePath)
        .then(res => {
            if (!res.ok) throw new Error(`Could not load ${fileName}`);
            return res.text();
        })
        .then(data => {
            const el = document.getElementById(elementId);
            if (el) {
                el.innerHTML = data;
                // Important: Fix the paths AFTER the HTML is injected
                fixRelativePaths(elementId);
            }
        })
        .catch(err => console.error("Component Load Error:", err));
}

/* ================= ADMIN DATA FETCHING ================= */

let currentType = "contacts";

window.fetchData = async function(type) {
    currentType = type;
    if (!token) return;

    try {
        const res = await fetch(`${API}/${type}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.ok) {
            const actualData = Array.isArray(data) ? data : (data.data || []);
            renderTable(actualData);
        } else if (res.status === 401) {
            alert("Session expired.");
            window.logout();
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
};

// Placeholder for renderTable (keep your existing logic if preferred)
function renderTable(data) {
    const tableBody = document.getElementById("tableBody");
    if (!tableBody) return;
    tableBody.innerHTML = data.length === 0 ? "<tr><td>No data found</td></tr>" : "";
    // ... rest of your table rendering logic ...
}

/* ================= LOGOUT ================= */

window.logout = function() {
    localStorage.removeItem("token");
    const target = isInAdminFolder ? "login.html" : "admin/login.html";
    window.location.href = target;
};

/* ================= INITIALIZATION ================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Header and Footer
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");

    // 2. If we are on the admin dashboard, load initial data
    if (isAdminDashboard && document.getElementById("tableBody")) {
        window.fetchData("contacts");
    }
});