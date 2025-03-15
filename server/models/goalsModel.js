const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    activities: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    requirements: {
      type: String,
    },

    deadline: {  
      type: Date,
      required: true
    },
    
    user_id: {
      type: String,
      required: true,
    },
  },{ timestamps: true });

const Goals = new mongoose.model("Goals", goalSchema);
module.exports = Goals;
