/**
 * LOVELINES API HANDLER
 * Corrected for Production on Render
 */

const API_BASE = "https://loveliness-backend.onrender.com/api";

// Helper for POST requests
async function postData(endpoint, data) {
    try {
        const url = `${API_BASE}/${endpoint}`;
        console.log("Sending request to:", url);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Check for non-JSON response (usually happens if server is waking up)
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server is waking up. Please wait 30 seconds and try again.");
        }

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || `Error: ${res.status}`);
        }

        return result;

    } catch (error) {
        console.error("API Error:", error.message);
        throw error;
    }
}

// Global initialization for all forms
document.addEventListener("DOMContentLoaded", () => {
    
    // --- CONTACT FORM ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector("button");
            const status = document.createElement("p"); 
            status.id = "status-msg";
            contactForm.appendChild(status);

            const data = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("phone").value.trim(),
                subject: document.getElementById("subject").value.trim(),
                message: document.getElementById("message").value.trim()
            };

            try {
                btn.disabled = true;
                btn.textContent = "Sending...";
                const res = await postData("contact", data);
                status.textContent = res.message || "Message sent successfully!";
                status.style.color = "green";
                contactForm.reset();
            } catch (err) {
                status.textContent = err.message;
                status.style.color = "red";
            } finally {
                btn.disabled = false;
                btn.textContent = "SUBMIT MESSAGE";
            }
        });
    }

    // --- COUNSELLING FORM ---
    const counsellingForm = document.getElementById("counsellingForm");
    if (counsellingForm) {
        counsellingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = document.getElementById("submit-btn");
            const status = document.getElementById("statusMsg");

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
                const res = await postData("counselling", data);
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

    // --- VOLUNTEER FORM ---
    const volunteerForm = document.getElementById("volunteerForm");
    if (volunteerForm) {
        volunteerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = document.getElementById("vol-submit-btn");
            const status = document.getElementById("volStatusMsg");

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
                const res = await postData("volunteer", data);
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
});