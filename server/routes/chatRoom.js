const express = require('express')
const {getMessages, createMessages} = require('../controllers/chatRoomController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)

router.get('/get', getMessages);
router.post('/add', createMessages);

module.exports = router
