const transporter = require("../config/emailConfig");

const sendEmail = async (options) => {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: options.html
  };

  await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;