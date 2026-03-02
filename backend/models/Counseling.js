const mongoose = require('mongoose');

const counselingSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  issue: { type: String, required: true }, // trauma, guidance, abuse, etc.
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Counseling', counselingSchema);