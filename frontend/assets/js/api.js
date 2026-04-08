console.log("API JS LOADED");

// ✅ Ensure this URL exactly matches your Render Backend Service URL
const API_BASE = "https://loveliness-backend.onrender.com/api";

// =======================
// GENERIC REQUEST HANDLER
// =======================
async function postData(endpoint, data) {
    try {
        console.log(`Attempting to send data to: ${API_BASE}/${endpoint}`);
        
        const res = await fetch(`${API_BASE}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Check if the response is actually JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server did not return JSON. Check if backend is running.");
        }

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || `Server Error: ${res.status}`);
        }

        console.log("API Success:", result);
        return result;

    } catch (error) {
        console.error("Detailed API Error:", error);
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
        // Find or create status message area
        let status = document.getElementById("contactStatus");
        if (!status) {
            status = document.createElement("p");
            status.id = "contactStatus";
            status.style.marginTop = "10px";
            contactForm.appendChild(status);
        }

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
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
                status.textContent = "Connecting to server...";
                status.style.color = "blue";
                
                const response = await sendContact(data);

                status.textContent = response.message || "Message sent successfully!";
                status.style.color = "green";
                contactForm.reset();

            } catch (error) {
                status.textContent = "Error: " + (error.message || "Connection failed");
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
            status.textContent = "Processing request...";
            status.style.color = "blue";

            const res = await sendCounselling(data);
            status.textContent = res.message || "Request submitted successfully!";
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
            status.textContent = "Submitting application...";
            status.style.color = "blue";

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