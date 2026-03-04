const transporter = require("../config/emailConfig");

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: `"Machpadaco Support" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email failed:", error.message);
  }
};

module.exports = sendEmail;