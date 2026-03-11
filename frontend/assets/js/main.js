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