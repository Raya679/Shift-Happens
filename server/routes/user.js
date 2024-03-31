const express = require('express')

const router = express.Router();

//controller functions 
const {signupUser, loginUser, getTherapists} = require ('../controllers/userController');

//login route 
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//therapists 
router.get('/therapists',getTherapists)



module.exports = router