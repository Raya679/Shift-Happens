
const ChatMessages = require("../models/chatModel");
const mongoose = require('mongoose')

const getMessages = async (req, res) => {
    
    const user_id = req.user._id
    const messages = await ChatMessages.find({ user_id }).sort({createdAt: -1})
  
    res.status(200).json(messages)
    // console.log(messages);
}

const createMessages = async (req, res) => {
    const { writer, writeup } = req.body;

    if (!writer || !writeup) {
        return res
            .status(400)
            .json({ error: "Writer and writeup are required" });
    }

    try {
        const user_id = req.user._id
        // const user_id = req.user._id 
        const message = await ChatMessages.create({writer, writeup, user_id})
        // const token = createToken(data._id)
        res.status(200).json(message)
    }
    catch (error) {
        res.status(400).json({error: error.message})
      }
}

module.exports = {getMessages, createMessages}

