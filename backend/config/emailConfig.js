const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use false for Port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // This allows the connection to succeed even if the network has minor certificate mismatches
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Email server connection failed:", error.message);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

module.exports = transporter;