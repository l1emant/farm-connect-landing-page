const express = require('express')

const router = express.Router()
const { registerUser, loginUser } = require('../controllers/auth-controller.js')

// all routes are related to authentication and authorization

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router