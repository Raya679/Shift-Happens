// const jwt = require('jsonwebtoken')
// const Therapist = require('../models/therapistModel')

// const requireTherapistAuth = async (req,res,next) => {
//     //verify authentication
//     const {authorization}=req.headers

//     if(!authorization || !authorization.startsWith('Bearer ')){
//         return res.status(401).json({error:'Authorization token required'})
//     }

//     const token = authorization.split(' ')[1]

//     try{
//         const {_id} = jwt.verify(token,process.env.SECRET)
//         req.therapist = await Therapist.findOne({_id}).select('_id')
//         next()

//     }catch (error){
//         console.log(error)
//         res.status(401).json({error:'Request not authorized'})
//     }
// }

// module.exports = requireTherapistAuth

// requireTherapistAuth.js
// const jwt = require('jsonwebtoken');
// const Therapist = require('../models/therapistModel');

// const requireTherapistAuth = async (req, res, next) => {
//     const { authorization } = req.headers;

//     if (!authorization || !authorization.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Authorization token required' });
//     }

//     const token = authorization.split(' ')[1];

//     try {
//         const decodedToken = jwt.verify(token, process.env.SECRET);
//         const { _id } = decodedToken;

//         req.therapist = await Therapist.findOne({ _id }).select('_id');
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ error: 'Invalid or expired token' });
//     }
// };

// module.exports = requireTherapistAuth;



// requireAuth.js




const jwt = require('jsonwebtoken')
const Therapist = require('../models/therapistModel')

const requireTherapistAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.therapist = await Therapist.findOne({ _id }).select('_id')
    next()


  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireTherapistAuth