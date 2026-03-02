const Counseling = require('../models/Counseling');
const sendEmail = require('../utils/sendEmail');

exports.submitCounseling = async (req, res) => {
  const { fullName, email, phone, issue } = req.body;

  if (!fullName || !email || !issue)
    return res.status(400).json({ message: 'All required fields must be filled' });

  try {
    await Counseling.create({ fullName, email, phone, issue });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'New Counseling Form Submission',
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nIssue: ${issue}`,
    });

    res.status(201).json({ message: 'Counseling request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};