const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    await Contact.create({ name, email, message });

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    res.status(201).json({ message: 'Contact submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};