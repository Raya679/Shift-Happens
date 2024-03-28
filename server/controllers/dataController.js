const Data = require('../models/dataModel')
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

const getData = async (req, res) => {
    const {id} = req. params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such data'})
      }


    const data = await Data.findById(id);
    if(!data)
    {
        return res.status(404).json({error: 'No such data'})
    }

    res.status(200).json(data)    
}



const createdata = async (req, res) => {
    const { startDate, endDate, strings} = req.body 

    let emptyFields = [] 

    if(!startDate)
    {
        emptyFields.push('startDate')
    }

    if(!endDate)
    {
        emptyFields.push('endDate')
    }

    if(!strings)
    {
        emptyFields.push('strings')
    }

    if(emptyFields.length > 0) 
    {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        // const user_id = req.user._id 
        const data = await Data.create({startDate, endDate, strings})
        // const token = createToken(data._id)
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({error: error.message})
      }
}

module.exports = { getData,createdata}