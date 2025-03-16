const Goals = require("../models/goalsModel");
const mongoose = require("mongoose");

const getGoals = async (req, res) => {
  const user_id = req.user._id;
  const goals = await Goals.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(goals);
};

const getGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such goal" });
  }

  const goal = await Goals.findById(id);
  if (!goal) {
    return res.status(404).json({ error: "No such goal" });
  }

  res.status(200).json(goal);
};

const createGoal = async (req, res) => {
  const { activities, duration, requirements, deadline, importance} = req.body;

  let emptyFields = [];

  if (!activities) {
    emptyFields.push("activities");
  }

  if (!duration) {
    emptyFields.push("duration");
  }

  // if (!requirements) {
  //   emptyFields.push("requirements");
  // }

  // if (!deadline) {
  //   emptyFields.push('deadline');
  // }

  if (!importance) {
    emptyFields.push('importance');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    // const user_id = req.user._id
    const goal = await Goals.create({
      activities,
      duration,
      requirements: requirements || null,
      deadline: deadline || null,
      importance,
      user_id,
    });
    // const token = createToken(data._id)
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such goal" });
  }

  const goal = await Goals.findOneAndDelete({ _id: id });

  if (!goal) {
    return res.status(400).json({ error: "No such goal" });
  }

  res.status(200).json(goal);
};

// const markGoalAsDone = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'Invalid goal ID' });
//   }

//   const goal = await Goals.findByIdAndDelete(id);

//   if (!goal) {
//       return res.status(404).json({ error: 'Goal not found' });
//   }

//   res.status(200).json({ message: 'Goal completed and removed!' });
// };


module.exports = { getGoals,getGoal,createGoal, deleteGoal}
