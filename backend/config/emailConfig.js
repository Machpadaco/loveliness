const { Resend } = require('resend');

// We initialize it here, but we will use a helper function to send
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Loveliness NGO <onboarding@resend.dev>', // Keep this exactly as is for now
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      throw error;
    }

    console.log("✅ Email sent successfully via Resend API:", data.id);
    return data;
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    throw err;
  }
};

module.exports = { sendEmail };