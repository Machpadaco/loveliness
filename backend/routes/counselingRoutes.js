const express = require('express');
const router = express.Router();

const { submitCounselling } = require('../controllers/counsellingController');

router.post('/', submitCounselling);

module.exports = router;