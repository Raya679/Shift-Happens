const Goals = require('../models/goalsModel')
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')

// const createToken = (_id) => {
//     return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' })
//   }

// const getdata = async (req, res) => {
//     const _id = req._id

//     const data = await Data.find({_id})

//     res.status(200).json(data)
// }
const getGoals = async (req, res) => {
    const goals = await Goals.find({}).sort({createdAt: -1})
  
    res.status(200).json(goals)
  }

const getGoal = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such goal'})
      }


    const goal = await Goals.findById(id);
    if(!goal)
    {
        return res.status(404).json({error: 'No such goal'})
    }

    res.status(200).json(goal)    
}



const createGoal = async (req, res) => {
    const { activities, duration, requirements} = req.body 

    let emptyFields = [] 

    if(!activities)
    {
        emptyFields.push('activities')
    }

    if(!duration)
    {
        emptyFields.push('duration')
    }

    if(!requirements)
    {
        emptyFields.push('requirements')
    }

    if(emptyFields.length > 0) 
    {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        // const user_id = req.user._id 
        const goal = await Goals.create({activities, duration, requirements})
        // const token = createToken(data._id)
        res.status(200).json(goal)
    }
    catch (error) {
        res.status(400).json({error: error.message})
      }
}

const deleteGoal = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such goal'})
    }
  
    const goal = await Goals.findOneAndDelete({_id: id})
  
    if(!goal) {
      return res.status(400).json({error: 'No such goal'})
    }
  
    res.status(200).json(goal)
}

module.exports = { getGoals,getGoal,createGoal, deleteGoal}