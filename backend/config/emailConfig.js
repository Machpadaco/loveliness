const nodemailer = require("nodemailer");

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: Verify connection when server starts
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email server connection failed:", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

module.exports = transporter;