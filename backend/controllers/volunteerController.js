const Volunteer = require('../models/Volunteer');
const sendEmail = require('../utils/sendEmail');

exports.submitVolunteer = async (req, res) => {
  const { fullName, email, country, interestArea } = req.body;

  if (!fullName || !email || !country)
    return res.status(400).json({ message: 'Required fields missing' });

  try {
    await Volunteer.create({ fullName, email, country, interestArea });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'New Volunteer Signup',
      text: `Name: ${fullName}\nEmail: ${email}\nCountry: ${country}\nInterest: ${interestArea}`,
    });

    res.status(201).json({ message: 'Volunteer signup submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};