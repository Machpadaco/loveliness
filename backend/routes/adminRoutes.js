const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getContacts,
  getCounselling,
  getVolunteers,
  deleteContact,
  deleteCounselling,
  deleteVolunteer
} = require("../controllers/adminController");


/* =========================
   GET DATA
========================= */

router.get("/contacts", getContacts);

router.get("/counselling", getCounselling);

router.get("/volunteers", getVolunteers);


/* =========================
   DELETE DATA
========================= */

router.delete("/contact/:id", deleteContact);

router.delete("/counselling/:id", deleteCounselling);

router.delete("/volunteer/:id", deleteVolunteer);


module.exports = router;