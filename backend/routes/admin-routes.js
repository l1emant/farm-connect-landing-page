const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware.js')
const adminMiddleware = require('../middleware/admin-middleware.js')

// 2 layer of protection
router.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to admin page'
    })
})

module.exports = router