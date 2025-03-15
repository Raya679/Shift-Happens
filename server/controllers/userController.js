//login user
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, password, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({mssg:'login user'})
};

const signupUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.signup(email, username, password);

    const token = createToken(user._id);

    res.status(200).json({ username, email, password, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTherapists = async (req, res) => {
  const therapists = await Therapist.find({});
  res.json({ therapists });
};

module.exports = { signupUser, loginUser, getTherapists };
