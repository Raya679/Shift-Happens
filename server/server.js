require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const dataRoutes = require('./routes/data')
const goalRoutes = require('./routes/goals')
const moodRoutes = require('./routes/moods')
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


app.use('/api/user', userRoutes)
app.use('/api/data', dataRoutes)
app.use('/api/goal', goalRoutes )
app.use('/api', moodRoutes )
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