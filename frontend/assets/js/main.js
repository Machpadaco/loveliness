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
 * Automatically detects if we are in a subfolder 
 * and adjusts the path to the components folder.
 */
function getBasePath() {
    // Check if the current URL contains "/admin/"
    const path = window.location.pathname;
    if (path.includes("/admin/")) {
        return "../"; // Step out one level
    }
    return ""; // Stay in current level (for root files like index.html)
}

function loadComponent(elementId, fileName) {
    const base = getBasePath();
    const filePath = `${base}components/${fileName}`;

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(err => console.error(err));
}

// Now you just call the filename, and the script handles the rest!
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
});