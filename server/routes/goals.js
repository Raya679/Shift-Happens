const express = require('express')
const {getGoal,createGoal, deleteGoal, getGoals} = require('../controllers/goalController')
// const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
// router.use(requireAuth)

// require auth for all data routes
// router.use(requireAuth)

// POST a new data
router.post('/add', createGoal)
router.get('/:id', getGoal)
router.get('/', getGoals)
router.delete('/:id', deleteGoal)

module.exports = router