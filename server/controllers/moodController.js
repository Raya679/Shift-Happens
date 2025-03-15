const Mood = require("../models/moodsModel");

const createMood = async (req, res) => {
  const { moodss, sleep, stress } = req.body;

  try {
    const user_id = req.user._id;
    const mood = await Mood.create({ moodss, sleep, stress, user_id });
    res.status(201).json(mood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMoods = async (req, res) => {
  const user_id = req.user._id;
  const moods = await Mood.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(moods);
};

module.exports = {
  createMood,
  getMoods,
};
