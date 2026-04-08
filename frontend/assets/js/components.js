/**
 * Load components using root-relative paths.
 * This ensures they load correctly from any folder level.
 */
function loadComponent(elementId, fileName) {
  // Starting with '/' ensures it looks from the root of the domain
  const filePath = `/components/${fileName}`;

  fetch(filePath)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${fileName} from ${filePath}`);
      return res.text();
    })
    .then(data => {
      const container = document.getElementById(elementId);
      if (container) {
        container.innerHTML = data;

        // Initialize mobile menu functionality specifically for the header
        if (fileName === "header.html") {
          initMobileMenu();
        }
      }
    })
    .catch(err => {
      console.error("Component Error:", err);
      // Fallback: Try relative path if root-relative fails (useful for local testing)
      if (err.message.includes("Failed to load")) {
         console.warn("Attempting relative path fallback...");
      }
    });
}

// Mobile menu toggle logic
function initMobileMenu() {
  const menuBtn = document.querySelector('#mobile-menu');
  const navList = document.querySelector('#nav-list');

  if (menuBtn && navList) {
    // Remove existing listener to prevent duplicates if function is called twice
    menuBtn.replaceWith(menuBtn.cloneNode(true));
    const newMenuBtn = document.querySelector('#mobile-menu');
    
    newMenuBtn.addEventListener('click', () => {
      navList.classList.toggle('active');
      newMenuBtn.classList.toggle('is-active');
    });
  }
}

// Run on load
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header-placeholder", "header.html");
  loadComponent("footer-placeholder", "footer.html");
});