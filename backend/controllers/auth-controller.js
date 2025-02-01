const User = require('../models/index.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// register controller
const registerUser = async (req, res) => {
    try {

        const { username, email, password, role } = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Username, email, and password are required."
            });
        }

        // check if user is already existing in our db
        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] })

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists either with same username or same email. Please try with a different username or email'
            })
        }

        // hash user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create a new user
        const newlyCreatedUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await newlyCreatedUser.save()

        if (newlyCreatedUser) {
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: newlyCreatedUser
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Unable to register user'
            })
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// login controller

const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both username and password'
            })
        }

        const checkUserExists = await User.findOne({ username })
        if (!checkUserExists) {
            return res.status(400).json({
                success: false,
                message: `User doesn't exist`
            })
        }

        // check for valid password    
        const isValidPassword = await bcrypt.compare(password, checkUserExists.password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        // Now we will create a jwt -> bearer token
        // Bearer Token -> It bears the information of that particular successful logged-in user

        // Using this token we can do various things -> ex: We can store that in our cookie or else we can pass that token to our frontend
        // and then in the frontend we can store it in our session storage and let's say there is an API call and in that API call we need to
        // pass that token as a bearer token 

        // we can get that token from session storage and pass it in our api

        // Create User token

        // payload, secretOrPrivateKey -> returns a JWT as string in synchronous way

        // this accessToken is in encrypted form
        const accessToken = jwt.sign({
            userId: checkUserExists._id,
            username: checkUserExists.username,
            role: checkUserExists.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30m'
        })

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            accessToken: accessToken // passing the access token to frontend
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { registerUser, loginUser }