const { Resend } = require('resend');

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

/* =======================
    HELPER FUNCTION
======================= */
const sendResendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Lovelines NGO <onboarding@resend.dev>', // Keep this exact for Free Tier
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error(`❌ Resend Error [To: ${to}]:`, error.message);
      // We don't throw error here so that if the user's confirmation fails, 
      // the admin still gets the notification.
      return null;
    }

    console.log(`✅ Email sent successfully to ${to}`);
    return data;
  } catch (err) {
    console.error("❌ Email Service Failure:", err.message);
  }
};

/* =======================
    CONTACT EMAILS
======================= */
exports.sendContactEmails = async (data) => {
  // 1. Email to admin (This will always work)
  await sendResendEmail({
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

  // 2. Confirmation to sender (Only works if domain is verified in Resend)
  await sendResendEmail({
    to: data.email,
    subject: "We Received Your Message",
    html: `<p>Dear ${data.name},</p><p>Thank you for contacting Lovelines. We will respond shortly.</p>`
  });
};

/* =======================
    COUNSELLING EMAILS
======================= */
exports.sendCounsellingEmails = async (data) => {
  // 1. Email to admin
  await sendResendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Counselling Request - Lovelines",
    html: `
      <h2 style="color:#b71c1c;">New Counselling Request</h2>
      <hr/>
      <p><strong>Full Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Counselling Type:</strong> ${data.counsellingType}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `
  });

  // 2. Confirmation to sender
  await sendResendEmail({
    to: data.email,
    subject: "Counselling Request Received",
    html: `<p>Dear ${data.name}, your request has been received. Remain blessed.</p>`
  });
};

/* =======================
    VOLUNTEER EMAILS
======================= */
exports.sendVolunteerEmails = async (data) => {
  // 1. Email to admin
  await sendResendEmail({
    to: process.env.EMAIL_USER,
    subject: "New Volunteer Application - Lovelines",
    html: `
      <h2 style="color:#b71c1c;">New Volunteer Application</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Area:</strong> ${data.areaOfInterest}</p>
      <p><strong>Email:</strong> ${data.email}</p>
    `
  });

  // 2. Confirmation to volunteer
  await sendResendEmail({
    to: data.email,
    subject: "Volunteer Application Received",
    html: `<p>Dear ${data.name}, thank you for your willingness to serve with Lovelines.</p>`
  });
};