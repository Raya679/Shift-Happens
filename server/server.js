require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const goalRoutes = require("./routes/goals");
const moodRoutes = require("./routes/moods");
const posts = require("./routes/posts");

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/posts", posts);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
