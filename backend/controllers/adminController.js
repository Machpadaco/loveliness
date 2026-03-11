const Contact = require("../models/contactModel");
const Counselling = require("../models/counsellingModel");
const Volunteer = require("../models/volunteerModel");

/* GET ALL CONTACT MESSAGES */

exports.getContacts = async (req, res) => {

  try {

    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};


/* GET ALL COUNSELLING REQUESTS */

exports.getCounselling = async (req, res) => {

  try {

    const counselling = await Counselling.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: counselling.length,
      data: counselling
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};


/* GET ALL VOLUNTEERS */

exports.getVolunteers = async (req, res) => {

  try {

    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: volunteers.length,
      data: volunteers
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};


/* DELETE CONTACT */

exports.deleteContact = async (req, res) => {

  try {

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Contact deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};


/* DELETE COUNSELLING */

exports.deleteCounselling = async (req, res) => {

  try {

    await Counselling.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Counselling request deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};


/* DELETE VOLUNTEER */

exports.deleteVolunteer = async (req, res) => {

  try {

    await Volunteer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Volunteer deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};