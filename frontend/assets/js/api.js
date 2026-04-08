console.log("API JS LOADED");

// ✅ Production API URL
const API_BASE = "https://loveliness-backend.onrender.com/api";

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
            console.log("Contact Form submitted");

            const submitBtn = contactForm.querySelector("button");

            const data = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("phone").value.trim(),
                subject: document.getElementById("subject").value.trim(),
                message: document.getElementById("message").value.trim()
            };

            if (!data.name || !data.email || !data.subject || !data.message) {
                status.textContent = "Please fill all required fields.";
                status.style.color = "red";
                return;
            }

            try {
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

/* ================= COUNSELLING ================= */
const counsellingForm = document.getElementById("counsellingForm");

if (counsellingForm) {
    const status = document.getElementById("statusMsg");
    const btn = document.getElementById("submit-btn");

    counsellingForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById("userName").value.trim(),
            email: document.getElementById("userEmail").value.trim(),
            phone: document.getElementById("userPhone").value.trim(),
            country: document.getElementById("userCountry").value.trim(),
            counsellingType: document.getElementById("counsellingType").value,
            preferredContact: document.getElementById("preferredContact").value,
            message: document.getElementById("userMessage").value.trim()
        };

        try {
            btn.disabled = true;
            btn.textContent = "Sending...";
            status.textContent = "";

            const res = await sendCounselling(data);

            status.textContent = res.message || "Request submitted!";
            status.style.color = "green";
            counsellingForm.reset();

        } catch (err) {
            status.textContent = err.message;
            status.style.color = "red";
        } finally {
            btn.disabled = false;
            btn.textContent = "SUBMIT REQUEST";
        }
    });
}

/* ================= VOLUNTEER ================= */
const volunteerForm = document.getElementById("volunteerForm");

if (volunteerForm) {
    const status = document.getElementById("volStatusMsg");
    const btn = document.getElementById("vol-submit-btn");

    volunteerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("volName").value.trim(),
            email: document.getElementById("volEmail").value.trim(),
            phone: document.getElementById("volPhone").value.trim(),
            country: document.getElementById("volCountry").value.trim(),
            areaOfInterest: document.getElementById("volInterest").value,
            availability: document.getElementById("volAvailability").value,
            message: document.getElementById("volMessage").value.trim()
        };

        try {
            btn.disabled = true;
            btn.textContent = "Sending...";
            status.textContent = "";

            const res = await sendVolunteer(data);

            status.textContent = res.message || "Application submitted!";
            status.style.color = "green";
            volunteerForm.reset();

        } catch (err) {
            status.textContent = err.message;
            status.style.color = "red";
        } finally {
            btn.disabled = false;
            btn.textContent = "Submit Application";
        }
    });
}