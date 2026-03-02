const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  interestArea: { type: String }, // education, counseling, outreach, etc.
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Volunteer', volunteerSchema);