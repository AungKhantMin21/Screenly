const express = require('express');
const router = express.Router();

const screenResumeController = require('../controllers/screenResumeController');

router.post('/', screenResumeController.screenResume);

module.exports = router;