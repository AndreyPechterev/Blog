import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'

const app = express();
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_URL = process.env.DB_URL

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log(`is working on ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()