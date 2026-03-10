const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  country: {
    type: String
  },

  areaOfInterest: {
    type: String,
    required: true
  },

  availability: {
    type: String
  },

  message: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Volunteer", volunteerSchema);