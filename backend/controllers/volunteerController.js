const Volunteer = require("../models/Volunteer");
const emailService = require("../services/emailService");

exports.submitVolunteer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      country,
      areaOfInterest,
      availability,
      message
    } = req.body;

    // ✅ Basic validation
    if (!name || !email || !phone || !areaOfInterest) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields"
      });
    }

    // ✅ Save to MongoDB
    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      country,
      areaOfInterest,
      availability,
      message
    });

    console.log("✅ Volunteer application saved to MongoDB");

    // ✅ Send email notification via Resend API
    await emailService.sendVolunteerEmails(volunteer);
    
    console.log("✅ Volunteer email processed via Resend");

    // Success response
    res.status(200).json({
      success: true,
      message: "Volunteer application submitted successfully"
    });

  } catch (error) {
    console.error("❌ Volunteer Submission Error:", error.message);

    const errorMessage = error.message.includes("Resend") 
      ? "Application saved, but email notification failed." 
      : "Server error. Please try again later.";

    res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};