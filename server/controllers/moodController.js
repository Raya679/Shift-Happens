// controllers/moodController.js

const Mood = require('../models/moodsModel');

// Create a new mood entry
const createMood = async (req, res) => {
  const { moodss, sleep, stress } = req.body;

  try {
    const mood = await Mood.create({ moodss, sleep, stress });
    res.status(201).json(mood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all mood entries
const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({});
    res.status(200).json(moods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMood,
  getMoods
};
