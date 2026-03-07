const Counselling = require("../models/Counselling");
const emailService = require("../services/emailService");

exports.submitCounselling = async (req, res) => {

  try {

    const { name, email, phone, country, counsellingType, preferredContact, message } = req.body;

    // Save to database
    const counselling = await Counselling.create({
      name,
      email,
      phone,
      country,
      counsellingType,
      preferredContact,
      message
    });

    // Send email notification
    await emailService.sendCounsellingEmails(counselling);

    res.status(200).json({
      success: true,
      message: "Counselling request submitted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};