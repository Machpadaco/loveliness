// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit", async function(e){

e.preventDefault();

const data = {

name: document.getElementById("name").value,
email: document.getElementById("email").value,
message: document.getElementById("message").value

};

const response = await sendContact(data);

alert(response.message);

contactForm.reset();

});

}


// COUNSELLING FORM
const counsellingForm = document.getElementById("counsellingForm");

if(counsellingForm){

counsellingForm.addEventListener("submit", async function(e){

e.preventDefault();

const data = {

name: document.getElementById("name").value,
email: document.getElementById("email").value,
reason: document.getElementById("reason").value

};

const response = await sendCounselling(data);

alert(response.message);

counsellingForm.reset();

});

}


// VOLUNTEER FORM
const volunteerForm = document.getElementById("volunteerForm");

if(volunteerForm){

volunteerForm.addEventListener("submit", async function(e){

e.preventDefault();

const data = {

name: document.getElementById("name").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value

};

const response = await sendVolunteer(data);

alert(response.message);

volunteerForm.reset();

});

}

/**
 * Automatically detects path depth and loads HTML components (Header/Footer)
 */
function getBasePath() {
    const path = window.location.pathname;
    // If the file is inside the admin folder, we need to go up one level
    if (path.includes("/admin/")) {
        return "../";
    }
    return "";
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
            document.getElementById(elementId).innerHTML = data;
            
            // If we just loaded the header, initialize the mobile menu logic
            if (fileName === 'header.html') {
                initMobileMenu();
            }
        })
        .catch(err => console.error("Component Error:", err));
}

function initMobileMenu() {
    const menuBtn = document.querySelector('#mobile-menu');
    const navList = document.querySelector('#nav-list');

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            
            // Optional: Animation for hamburger bars
            menuBtn.classList.toggle('is-active');
        });
    }
}

// Start loading components when the page is ready
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});

/* --- Profile Bio Toggle Logic --- */
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.read-more-btn');

    if (buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Find the specific info container for this button
                const infoContainer = this.closest('.profile-info');
                const fullBio = infoContainer.querySelector('.full-bio-content');
                
                // Toggle the 'show-content' class
                fullBio.classList.toggle('show-content');

                // Update the button text based on state
                if (fullBio.classList.contains('show-content')) {
                    this.textContent = 'Read Less';
                    // Optional: Scroll slightly to keep the expanded text in view
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    this.textContent = 'Read More';
                }
            });
        });
    }
});