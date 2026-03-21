const sendEmail = require("../utils/sendEmail");

/* =======================
   CONTACT EMAILS
======================= */
exports.sendContactEmails = async (data) => {

  // Email to admin
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Contact Message - Lovelines",
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `
  });

  // Confirmation email to sender
  await sendEmail({
    to: data.email,
    subject: "We Received Your Message",
    html: `
      <p>Dear ${data.name},</p>
      <p>Thank you for contacting Lovelines International Christian Fellowship.</p>
      <p>We received your message regarding: <strong>${data.subject}</strong>.</p>
      <p>Our team will respond to you shortly.</p>
      <p>Remain blessed.</p>
    `
  });
};


/* =======================
   COUNSELLING EMAILS
======================= */
exports.sendCounsellingEmails = async (data) => {

  // Email to admin
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Counselling Request - Lovelines",
    html: `
      <h2 style="color:#b71c1c;">New Counselling Request</h2>
      <hr/>
      <p><strong>Full Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>
      <p><strong>Counselling Type:</strong> ${data.counsellingType}</p>
      <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
      <p><strong>Message:</strong></p>
      <p style="background:#f9f9f9; padding:10px; border-left:4px solid #b71c1c;">
        ${data.message}
      </p>
      <hr/>
      <p style="font-size:12px; color:gray;">This request was submitted via the Lovelines website.</p>
    `
  });

  // Confirmation email to sender
  await sendEmail({
    to: data.email,
    subject: "Your Counselling Request Has Been Received",
    html: `
      <p>Dear ${data.name},</p>

      <p>Thank you for reaching out to <strong>Lovelines International Christian Fellowship</strong>.</p>

      <p>Your counselling request has been successfully received. Our team will carefully review your message and reach out to you via your preferred contact method (<strong>${data.preferredContact}</strong>) as soon as possible.</p>

      <p>We are committed to supporting you with care, confidentiality, and compassion.</p>

      <br/>

      <p><strong>Summary of Your Request:</strong></p>
      <ul>
        <li><strong>Counselling Type:</strong> ${data.counsellingType}</li>
        <li><strong>Country:</strong> ${data.country}</li>
      </ul>

      <br/>

      <p>Remain blessed.</p>

      <p style="margin-top:20px;">
        <strong>Lovelines International Christian Fellowship</strong><br/>
        <em>Love in Practice</em>
      </p>
    `
  });
};


/* =======================
   VOLUNTEER EMAILS
======================= */
exports.sendVolunteerEmails = async (data) => {

  // Email to admin
  await sendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Volunteer Application - Lovelines",
    html: `
      <h2 style="color:#b71c1c;">New Volunteer Application</h2>
      <hr/>

      <p><strong>Full Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>

      <p><strong>Area of Interest:</strong> ${data.areaOfInterest}</p>
      <p><strong>Availability:</strong> ${data.availability}</p>

      <p><strong>Message:</strong></p>
      <p style="background:#f9f9f9; padding:10px; border-left:4px solid #b71c1c;">
        ${data.message || "No message provided"}
      </p>

      <hr/>
      <p style="font-size:12px; color:gray;">
        This application was submitted via the Lovelines website.
      </p>
    `
  });

  // Confirmation email to volunteer
  await sendEmail({
    to: data.email,
    subject: "Your Volunteer Application Has Been Received",
    html: `
      <p>Dear ${data.name},</p>

      <p>
        Thank you for your interest in volunteering with 
        <strong>Lovelines International Christian Fellowship</strong>.
      </p>

      <p>
        Your application has been successfully received. Our team will review your
        submission and contact you soon based on your selected area of interest.
      </p>

      <br/>

      <p><strong>Your Application Summary:</strong></p>
      <ul>
        <li><strong>Area of Interest:</strong> ${data.areaOfInterest}</li>
        <li><strong>Availability:</strong> ${data.availability || "Not specified"}</li>
        <li><strong>Country:</strong> ${data.country || "Not specified"}</li>
      </ul>

      <br/>

      <p>
        We appreciate your willingness to serve and make impact. Together, we can
        put <em>Love in Practice</em>.
      </p>

      <br/>

      <p>Remain blessed.</p>

      <p style="margin-top:20px;">
        <strong>Lovelines International Christian Fellowship</strong><br/>
        <em>Love in Practice</em>
      </p>
    `
  });
};