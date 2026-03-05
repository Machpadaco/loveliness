// controllers/contactController.js
const emailService = require("../services/emailService");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    await emailService.sendContactEmails({ name, email, phone, message });
    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};