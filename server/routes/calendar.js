const express = require('express');
const { createCalendar, getCalendarForDate, getCalendars } = require('../controllers/calendarController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/add', createCalendar);
router.get('/', getCalendars); // Route to get all calendar entries
router.get('/date', getCalendarForDate); // Route to get calendar entry for a specific date

module.exports = router;
