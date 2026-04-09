const Counselling = require("../models/Counselling");
const emailService = require("../services/emailService");

exports.submitCounselling = async (req, res) => {
  try {
    const { name, email, phone, country, counsellingType, preferredContact, message } = req.body;

    // ✅ Basic Validation
    if (!name || !email || !phone || !country || !counsellingType || !preferredContact || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // ✅ Save to database
    const counselling = await Counselling.create({
      name,
      email,
      phone,
      country,
      counsellingType,
      preferredContact,
      message
    });

    console.log("✅ Counselling request saved to MongoDB");

    // ✅ Send email notification via Resend API (via emailService)
    await emailService.sendCounsellingEmails(counselling);
    
    console.log("✅ Counselling email processed via Resend");

    res.status(200).json({
      success: true,
      message: "Counselling request submitted successfully"
    });

  } catch (error) {
    console.error("❌ Counselling Error:", error.message);

    // Provide a slightly more helpful error message if it's a specific email API issue
    const errorMessage = error.message.includes("Resend") 
      ? "Request saved, but email notification failed." 
      : "Server error, please try again";

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};