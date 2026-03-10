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

    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      country,
      areaOfInterest,
      availability,
      message
    });

    await emailService.sendVolunteerEmails(volunteer);

    res.status(200).json({
      success: true,
      message: "Volunteer application submitted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};