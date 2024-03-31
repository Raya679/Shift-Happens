const express = require('express');
const { createMood, getMoods } = require('../controllers/moodController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();
router.use(requireAuth)

// Route to create a new mood entry
router.post('/add', createMood);

// Route to get all mood entries
router.get('/', getMoods);

module.exports = router;