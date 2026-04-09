const { sendEmail } = require('../config/emailConfig');

// Inside your create function:
await sendEmail({
    to: process.env.EMAIL_USER,
    subject: `New Contact: ${req.body.subject}`,
    html: `<h3>New Contact Message</h3>
           <p><strong>Name:</strong> ${req.body.name}</p>
           <p><strong>Message:</strong> ${req.body.message}</p>`
});