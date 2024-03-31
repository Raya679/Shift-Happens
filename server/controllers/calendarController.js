const Calendar = require('../models/calendarModel');

// Create a new calendar entry
const createCalendar = async (req, res) => {
  const { grateful, feelings, memorableMoments, date } = req.body;

  try {
    const user_id = req.user._id;
    const calendar = await Calendar.findOneAndUpdate(
      { user_id, createdAt: { $gte: new Date(date), $lt: new Date(date).setDate(new Date(date).getDate() + 1) } }, // Find existing entry for the date
      { grateful, feelings, memorableMoments, user_id },
      { upsert: true, new: true }
    );
    res.status(201).json(calendar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get calendar entry for a specific date
const getCalendarForDate = async (req, res) => {
  const { date } = req.query;
  const user_id = req.user._id;

  try {
    const calendar = await Calendar.findOne({ user_id, createdAt: { $gte: new Date(date), $lt: new Date(date).setDate(new Date(date).getDate() + 1) } });
    res.status(200).json(calendar || { grateful: '', feelings: '', memorableMoments: '' }); // Return empty object if no entry found
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all calendar entries
const getCalendars = async (req, res) => {
  const user_id = req.user._id;

  try {
    const calendars = await Calendar.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(calendars);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCalendar,
  getCalendarForDate,
  getCalendars
};
