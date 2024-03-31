const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    PName: { type: String, required: true },
    Drname: { type: String, required: true },
    date: { type: String, required: true },
    slot: { type: String, required: true }
    
    
  },
  { timestamps: true }
);

const AppointmentInfos = new mongoose.model("AppointmentInfo", schema);
module.exports = AppointmentInfos;