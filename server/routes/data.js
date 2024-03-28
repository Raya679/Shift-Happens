const express = require('express')
const {getData,createdata} = require('../controllers/dataController')
// const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
// router.use(requireAuth)

// require auth for all data routes
// router.use(requireAuth)

// POST a new data
router.post('/add', createdata)
router.get('/:id', getData)

module.exports = router