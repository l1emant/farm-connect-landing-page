const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const connectToDB = require('./database/index.js')
const AuthRoutes = require('./routes/auth-routes.js')
const HomeRoutes = require('./routes/home-routes.js')
const AdminRoutes = require('./routes/admin-routes.js')

dotenv.config()

const app = express()

// Enable CORS for all routes
app.use(cors({
    origin: '*', // In production, replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Middleware
app.use(express.json())

// Connect to Database
connectToDB()

// Routes
app.use('/api/auth', AuthRoutes)
app.use('/api/home', HomeRoutes)
app.use('/api/admin', AdminRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server started on port number ${PORT}`)
})
