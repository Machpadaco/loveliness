const express = require("express");
const router = express.Router();

const { submitVolunteer } = require("../controllers/volunteerController");

// POST: Submit volunteer application
router.post("/", submitVolunteer);

module.exports = router;