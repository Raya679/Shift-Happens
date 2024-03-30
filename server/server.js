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


//Routes 

// app.get("/messages", async (req, res) => {
//   // const user_id = req.user._id
//   try {
//       const messages = await ChatMessage.find();
//       res.json(messages);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.post("/messages", async (req, res) => {
  
//   try {
//       const { user, message } = req.body;

//       if (!user || !message) {
//           return res
//               .status(400)
//               .json({ error: "User and message are required" });
//       }

//       const chatMessage = new ChatMessage({
//           user,
//           message,
//       });

//       await chatMessage.save();

//       res.status(201).json(chatMessage);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//   }
// });



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