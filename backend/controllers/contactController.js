const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {

    // 1️⃣ Save to MongoDB
    const newContact = await Contact.create({
      name,
      email,
      message
    });

    // 2️⃣ Send email notification to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // 3️⃣ Send auto-reply to the user
    await sendEmail({
      to: email,
      subject: "We received your message",
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for contacting Loveliness. We will reply soon.</p>
      `
    });

    // 4️⃣ Send API response
    res.status(201).json({
      success: true,
      message: 'Contact submitted successfully',
      data: newContact
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};