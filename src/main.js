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

// Settings
const port = process.env.SERVER_PORT || 3000

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.options('*', cors())
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
}

app.use(allowCrossDomain)

// Connect to DB
await mongodb.connectDB()

// Import certificates
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/vps-3308536-x.dattaweb.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/vps-3308536-x.dattaweb.com/fullchain.pem')
}

//
https.createServer(options, (req, res) => {
  console.log('HTTPS server listening on port ' + port)
}).listen(port)

// Routes
apiRouter(app)
