const emailService = require("../services/emailService");

exports.contact = async (req, res) => {

  try {

    const { name, email, phone, message } = req.body;

    const data = { name, email, phone, message };

    await emailService.sendContactEmails(data);

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};