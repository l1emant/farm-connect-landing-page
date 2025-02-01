const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connection to MongoDB successful`)
    } catch (error) {
        console.log(`Connection to MongoDB failed -> ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectToDB