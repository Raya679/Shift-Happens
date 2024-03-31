const express = require('express')
const {createAppt, ugetAppts, drgetAppts, deleteAppt} = require ('../controllers/appointmentController')
const requireAuth = require('../middleware/requireAuth')
// const requireTherapistAuth = require('../middleware/requireTherapistAuth')
const router = express.Router()

router.use(requireAuth)
// router.use(requireTherapistAuth)

router.post('/add', createAppt);
router.get('/getu', ugetAppts);
router.get('/getdr', drgetAppts);
router.delete('/:id', deleteAppt);

module.exports = router