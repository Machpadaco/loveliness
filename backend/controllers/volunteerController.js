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

    // Basic validation
    if (!name || !email || !phone || !areaOfInterest) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields"
      });
    }

    // Save to MongoDB
    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      country,
      areaOfInterest,
      availability,
      message
    });

    // Send email notifications
    await emailService.sendVolunteerEmails(volunteer);

    // Success response
    res.status(200).json({
      success: true,
      message: "Volunteer application submitted successfully"
    });

  } catch (error) {
    console.error("Volunteer Submission Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};