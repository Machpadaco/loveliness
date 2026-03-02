const express = require('express');
const router = express.Router();
const { submitCounseling } = require('../controllers/counselingController');

router.post('/counseling', submitCounseling);

module.exports = router;