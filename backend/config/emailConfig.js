const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // Using the direct IP-friendly host or forced IPv4
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Adding these specific timeout and TLS settings for Render
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,
  socketTimeout: 10000,
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
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