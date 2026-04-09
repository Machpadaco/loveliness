const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Loveliness NGO <onboarding@resend.dev>', // Resend free tier default
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("❌ Resend Error:", err.message);
    throw err;
  }
};

module.exports = { sendEmail };