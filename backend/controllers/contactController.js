const emailService = require("../services/emailService");
const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // 1. Save to MongoDB
    const contact = new Contact({ name, email, phone, subject, message });
    const savedContact = await contact.save();
    console.log("✅ Saved to MongoDB:", savedContact._id);

    // 2. Send Emails using Resend API (via the Email Service)
    // We wrap this in a try/catch or ensure the service is updated to handle Resend
    await emailService.sendContactEmails({ name, email, phone, subject, message });
    
    console.log("✅ Contact emails processed via Resend");

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.error("❌ Contact submission error:", error.message);
    
    // Provide a slightly more helpful error message if it's an email issue
    const errorMessage = error.message.includes("Resend") 
      ? "Message saved, but email notification failed." 
      : "Server error, please try again.";

    res.status(500).json({ 
      success: false, 
      message: errorMessage 
    });
  }
};