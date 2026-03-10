const sendEmail = require("../utils/sendEmail");

/* CONTACT EMAILS */

exports.sendContactEmails = async (data) => {

  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Contact Message - Lovelines",
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `
  });

  await sendEmail({
    to: data.email,
    subject: "We Received Your Message",
    html: `
      <p>Dear ${data.name},</p>
      <p>Thank you for contacting Lovelines International Christian Fellowship.</p>
      <p>Our team will respond to you shortly.</p>
    `
  });
};


/* COUNSELLING EMAILS */

exports.sendCounsellingEmails = async (data) => {

  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Counselling Request",
    html: `
      <h3>New Counselling Request</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Counselling Type:</strong> ${data.counsellingType}</p>
      <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `
  });

  await sendEmail({
    to: data.email,
    subject: "Counselling Request Received",
    html: `
      <p>Dear ${data.name},</p>
      <p>Your counselling request has been received.</p>
      <p>A Lovelines counselor will contact you soon.</p>
      <p>Remain blessed.</p>
    `
  });
};

/* VOLUNTEER EMAILS */

exports.sendVolunteerEmails = async (data) => {

  // Email to Lovelines admin
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Volunteer Application",
    html: `
      <h3>New Volunteer Application</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Area of Interest:</strong> ${data.areaOfInterest}</p>
      <p><strong>Availability:</strong> ${data.availability}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `
  });

  // Confirmation email to volunteer
  await sendEmail({
    to: data.email,
    subject: "Volunteer Application Received",
    html: `
      <p>Dear ${data.name},</p>
      <p>Thank you for volunteering with Lovelines International Christian Fellowship.</p>
      <p>Our team will review your application and contact you soon.</p>
      <p>Remain blessed.</p>
    `
  });

};