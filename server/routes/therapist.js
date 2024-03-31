const express = require('express')

const {loginTherapist ,signupTherapist } = require('../controllers/therapistController')
const router = express.Router()

//login route
router.post('/login',loginTherapist)

//signup route
router.post('/signup',signupTherapist)

module.exports=router