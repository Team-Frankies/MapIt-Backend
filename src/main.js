// Node modules
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import https from 'https'
import fs from 'fs'

// Import API
import apiRouter from './api.routes.js'

import * as mongodb from './db.js'

dotenv.config()

// Initialization
const app = express()

// Static files
app.use(express.static('public'))

// Settings
const port = process.env.SERVER_PORT || 3000

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.options('*', cors())

// Connect to DB
await mongodb.connectDB()

// Import certificates
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/vps-3308536-x.dattaweb.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/vps-3308536-x.dattaweb.com/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/vps-3308536-x.dattaweb.com/chain.pem')
}

// Create server
/* http.createServer(app).listen(80, () => {
  console.log('Listening...')
}) */

https.createServer(options, app)
  .listen(443, () => {
    console.log(`Server listening on port ${port}`)
  })

// Routes
apiRouter(app)
