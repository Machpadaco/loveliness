// Detect correct path
function getBasePath() {
  const path = window.location.pathname;

  // If inside admin folder, go up one level to find components
  if (path.includes("/admin/")) {
    return "../";
  }

  return "";
}

// Load components
function loadComponent(elementId, fileName) {
  const base = getBasePath();
  const filePath = `${base}components/${fileName}`;

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${fileName}`);
      return res.text();
    })
    .then(data => {
      const container = document.getElementById(elementId);
      if (container) {
        container.innerHTML = data;

        // Initialize menu only after header is actually injected into the DOM
        if (fileName === "header.html") {
          initMobileMenu();
        }
      }
    })
    .catch(err => console.error("Component Error:", err));
}

// Mobile menu
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

// Run on load
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
});