const Therapist = require('../models/therapistModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET_THERAPIST, {expiresIn:'3d'})
}

// login user
const loginTherapist = async(req,res) => {
    const {email,password} = req.body
    
    try{
        const therapist = await Therapist.login(email,password)

        //create token
        const token = createToken(therapist._id)

        res.status(200).json({email,token})

    } catch (error){
        res.status(400).json({error:error.message})
    }
}

// signup user
const signupTherapist = async(req,res) => {
    const {name,email,specialization,password} = req.body

    try{
        const therapist = await Therapist.signup(name,email,specialization,password)

        //create token
        const token=createToken(therapist._id)

        res.status(200).json({name,email,specialization,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {loginTherapist,signupTherapist}
