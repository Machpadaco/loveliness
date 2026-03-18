const API_BASE = "http://localhost:5000/api";

// CONTACT
async function sendContact(data){

const res = await fetch(`${API_BASE}/contact`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(data)

});

return res.json();

}

// COUNSELLING
async function sendCounselling(data){

const res = await fetch(`${API_BASE}/counselling`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(data)

});

return res.json();

}

// VOLUNTEER
async function sendVolunteer(data){

const res = await fetch(`${API_BASE}/volunteer`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(data)

});

return res.json();

}

// CONNECT CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        try {
            const response = await sendContact(data);

            alert(response.message || "Message sent successfully!");
            contactForm.reset();

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Try again.");
        }
    });
}