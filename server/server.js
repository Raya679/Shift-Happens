require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const goalRoutes = require('./routes/goals')
const moodRoutes = require('./routes/moods')
const posts = require("./routes/posts");
const replies = require("./routes/replies");
const cors = require("cors");
const chatroomroutes = require('./routes/chatRoom');
const therapistRoutes = require('./routes/therapist')
const Appointment = require("./routes/appointment");

const app = express()

// middleware
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/user', userRoutes)
app.use('/api/goals', goalRoutes )
app.use('/api/moods', moodRoutes )

app.use("/api/posts", posts);
app.use("/api/reply", replies);

app.use('/api/chatmessages', chatroomroutes)

app.use('/api/therapist/',therapistRoutes)

app.use('/api/appointmentinfos', Appointment);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })