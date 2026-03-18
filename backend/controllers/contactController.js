const emailService = require("../services/emailService");
const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Save to MongoDB
    const contact = new Contact({ name, email, phone, subject, message });
    const savedContact = await contact.save();
    console.log("Saved to MongoDB:", savedContact);

    // Send Emails
    await emailService.sendContactEmails({ name, email, phone, subject, message });

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};