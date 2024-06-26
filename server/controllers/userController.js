//login user 
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Therapist = require('../models/therapistModel')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async(req, res) => {
    const{  username, password} = req.body

    try {
        const user = await User.login(username, password )


        //creating a token 
        const token = createToken(user._id)

        res.status(200).json({username,password,token})
        // res.status(201).json({ user }); 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // res.json({mssg:'login user'})
}

const signupUser = async (req, res) => {
    const {email, username, password} = req.body

    try {
        const user = await User.signup(email, username, password)


        //creating a token 
        const token = createToken(user._id)

        res.status(200).json({username,email, password, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'signup user'})
}

const getTherapists = async (req,res) => {
    const therapists = await Therapist.find({});
    res.json({ therapists});
}

module.exports = {signupUser, loginUser,getTherapists}

