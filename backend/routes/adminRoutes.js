const express = require("express");
const router = express.Router();

const {
  getContacts,
  getCounselling,
  getVolunteers,
  deleteContact,
  deleteCounselling,
  deleteVolunteer
} = require("../controllers/adminController");


router.get("/contacts", getContacts);

router.get("/counselling", getCounselling);

router.get("/volunteers", getVolunteers);


router.delete("/contact/:id", deleteContact);

router.delete("/counselling/:id", deleteCounselling);

router.delete("/volunteer/:id", deleteVolunteer);


module.exports = router;