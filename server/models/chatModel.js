const mongoose = require('mongoose');
const Schema = mongoose.Schema

const chatMessageSchema = new Schema({

    writer: 
    { type: String, 
      required: true 
    },

    writeup: 
    { type: String, 
    required: true 
    },
    // timestamp: { type: Date, default: Date.now },

    user_id: {
        type: String,
        required: true
      }

}, { timestamps: true });
 
const ChatMessages = new mongoose.model('ChatMessages', chatMessageSchema);
 
module.exports = ChatMessages;
