const express = require('express');
const router = express.Router();
const { createMood, getMoods } = require('../controllers/moodController');

// Route to create a new mood entry
router.post('/moods', createMood);

// Route to get all mood entries
router.get('/moods', getMoods);

module.exports = router;