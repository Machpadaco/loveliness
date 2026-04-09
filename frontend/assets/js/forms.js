/**
 * FORMS.JS - Handles submission logic for all forms
 */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Forms.js initialized");

    // --- CONTACT FORM HANDLER ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector("button");
            const originalText = btn.textContent;

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
                // Calls sendContact from api.js
                await sendContact(data); 
                alert("Thank you! Your message has been sent.");
                contactForm.reset();
            } catch (err) {
                alert("Submission failed: " + err.message);
            } finally {
                btn.disabled = false;
                btn.textContent = originalText;
            }
        });
    }

    // --- COUNSELLING FORM HANDLER ---
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
                await sendCounselling(data);
                if (status) {
                    status.textContent = "Request submitted successfully!";
                    status.style.color = "green";
                } else {
                    alert("Request submitted successfully!");
                }
                counsellingForm.reset();
            } catch (err) {
                if (status) {
                    status.textContent = err.message;
                    status.style.color = "red";
                } else {
                    alert("Error: " + err.message);
                }
            } finally {
                btn.disabled = false;
                btn.textContent = "SUBMIT REQUEST";
            }
        });
    }

    // --- VOLUNTEER FORM HANDLER ---
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
                await sendVolunteer(data);
                if (status) {
                    status.textContent = "Application submitted successfully!";
                    status.style.color = "green";
                }
                volunteerForm.reset();
            } catch (err) {
                if (status) {
                    status.textContent = err.message;
                    status.style.color = "red";
                }
            } finally {
                btn.disabled = false;
                btn.textContent = "Submit Application";
            }
        });
    }
});