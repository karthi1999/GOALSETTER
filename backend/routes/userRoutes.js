const express = require('express')
const router = express.Router()
const { registerUser, LoginUser, userDetails } = require('../contollers/userController')
const { protect } = require('../middleware/authMiddleware')


router.post('/', registerUser)
router.post('/userlogin', LoginUser)
router.get('/userdetails', protect, userDetails)

module.exports = router
