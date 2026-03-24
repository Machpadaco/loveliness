console.log("API JS LOADED");

const API_BASE = "http://127.0.0.1:5000/api";

// =======================
// GENERIC REQUEST HANDLER
// =======================
async function postData(endpoint, data) {
    try {
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || "Request failed");
        }

        return result;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// =======================
// API FUNCTIONS
// =======================
function sendContact(data) {
    return postData("contact", data);
}

function sendCounselling(data) {
    return postData("counselling", data);
}

function sendVolunteer(data) {
    return postData("volunteer", data);
}

// =======================
// CONNECT CONTACT FORM
// =======================
window.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const status = document.createElement("p");
        status.style.marginTop = "10px";
        contactForm.appendChild(status);

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Form submitted"); // DEBUG

            const submitBtn = contactForm.querySelector("button");

            const data = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("phone").value.trim(),  // new
                subject: document.getElementById("subject").value.trim(),
                message: document.getElementById("message").value.trim()
            };

            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                status.textContent = "Please fill all fields.";
                status.style.color = "red";
                return;
            }

            try {
                // UI Feedback
                submitBtn.disabled = true;
                submitBtn.textContent = "Sending...";
                status.textContent = "";
                
                const response = await sendContact(data);

                status.textContent = response.message || "Message sent successfully!";
                status.style.color = "green";

                contactForm.reset();

            } catch (error) {
                status.textContent = error.message || "Something went wrong.";
                status.style.color = "red";

            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "SUBMIT MESSAGE";
            }
        });
    }

});