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

/* ============================================================
   GLOBAL FUNCTIONS 
   (Attaching to window makes them accessible to forms.js)
   ============================================================ */

window.sendContact = function(data) {
    return postData("contact", data);
};

window.sendCounselling = function(data) {
    return postData("counselling", data);
};

window.sendVolunteer = function(data) {
    return postData("volunteer", data);
};

console.log("API Functions Loaded & Exported Globally");