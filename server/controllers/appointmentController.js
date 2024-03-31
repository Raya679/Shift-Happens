const AppointmentInfos = require ('../models/appointmentModel');
const mongoose = require('mongoose')

// const createAppt = async (req, res) => {
//     const { PName, Drname, date, slot} = req.body 

//     try {
//         const user_id = req.user._id
//         // const user_id = req.user._id 
//         // const therapist_id = req.therapist._id
//         const appointment = await AppointmentInfos.create({PName, Drname, date, slot, user_id})
//         // const token = createToken(data._id)
//         res.status(200).json(appointment)
//     }
//     catch (error) {
//         res.status(400).json({error: error.message})
//       }
// }

const createAppt = async (req, res) => {
    const { PName, Drname, date, slot } = req.body;

    try {
        // if (!req.user || !req.user._id) {
        //     throw new Error("User ID is missing or invalid.");
        // }

        // if (!req.therapist || !req.therapist._id) {
        //     throw new Error("Therapist ID is missing or invalid.");
        // }

        // const user_id = req.user._id;
        const therapist_id = req.therapist._id;

        const appointment = await AppointmentInfos.create({ PName, Drname, date, slot, therapist_id });

        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};



const ugetAppts = async (req, res) => {
    const user_id = req.user._id
    // const dr_id = req.therapist._id
    const appointments = await AppointmentInfos.find({ user_id}).sort({createdAt: -1})
  
    res.status(200).json(appointments)
  }
const drgetAppts = async (req, res) => {
    const therapist_id = req.therapist._id
    const appointments = await AppointmentInfos.find({ therapist_id}).sort({createdAt: -1})

    res.status(200).json(appointments)
}

const deleteAppt = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such appointment'})
    }
  
    const appointment = await AppointmentInfos.findOneAndDelete({_id: id})
  
    if(!appointment) {
      return res.status(400).json({error: 'No such appointment'})
    }
  
    res.status(200).json(appointment)
}
  module.exports = {createAppt, ugetAppts, drgetAppts, deleteAppt}