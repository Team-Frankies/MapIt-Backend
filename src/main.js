// Node modules
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
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
await mongodb.connectDB()

// Listen both http & https ports
const httpServer = http.createServer(app)
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/vps-3308536-x.dattaweb.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/vps-3308536-x.dattaweb.com/fullchain.pem')
}, app)

httpServer.listen(80, () => {
  console.log('HTTP Server running on port 80')
})

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443')
})

await mongodb.connectDB()

// Routes
apiRouter(app)

// Start Server
app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
