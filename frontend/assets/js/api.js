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