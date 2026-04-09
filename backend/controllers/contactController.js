const { sendEmail } = require('../config/emailConfig'); // Updated import

// Inside your create function:
try {
    const newContact = await Contact.create(req.body);
    
    // Updated Email call
    await sendEmail({
        to: process.env.EMAIL_USER, // Send it to yourself
        subject: `New Contact: ${req.body.subject}`,
        html: `<p>You have a new message from ${req.body.name}</p>`
    });

    res.status(201).json({ success: true, message: "Message sent!" });
} catch (error) {
    // ... error handling
}