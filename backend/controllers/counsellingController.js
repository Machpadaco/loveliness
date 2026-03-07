const emailService = require("../services/emailService");

exports.submitCounselling = async (req, res) => {

  try {

    const { name, email, phone, counsellingType, message } = req.body;

    const data = {
      name,
      email,
      phone,
      counsellingType,
      message
    };

    await emailService.sendCounsellingEmails(data);

    res.status(200).json({
      success: true,
      message: "Counselling request sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};