const mongoose = require("mongoose");

const counsellingSchema = new mongoose.Schema({
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

  counsellingType: {
    type: String,
    required: true
  },

  preferredContact: {
    type: String
  },

  message: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Counselling", counsellingSchema);