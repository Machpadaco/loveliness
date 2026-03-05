const sendEmail = require("../utils/sendEmail");

exports.sendContactEmails = async (data) => {

  // Email to the organization
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

  // Confirmation email to the client
  await sendEmail({
    to: data.email,
    subject: "We received your message",
    html: `
      <h3>Thank you for contacting Lovelines International Christian Fellowship</h3>
      <p>Dear ${data.name},</p>
      <p>We have received your message. Our team will respond to you shortly.</p>
      <p>God bless you.</p>
    `
  });

};