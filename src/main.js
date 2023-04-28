// Node odules
import express, { application, json } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

// Import API
import api_router from './api.routes.js'


// Initialization
const app = express()

// Settings
const port = process.env.SERVER_PORT

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
api_router(app)

// Start Server
app.listen(port, () => {
    console.log(`Server on port ${port}`)
})