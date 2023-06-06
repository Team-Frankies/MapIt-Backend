// Node Modules
import express from 'express'

// Routes
import authRoutes from './routes/auth.routes.js'
import commentRouter from './routes/comment.routes.js'
import responseRouter from './routes/response.routes.js'
import placeId from './routes/placeId.route.js'
import maps from './routes/maps.routes.js'
import contact from './routes/contact.routes.js'

function apiRouter (app) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/auth', authRoutes)
  router.use(commentRouter)
  router.use('/comments', responseRouter)
  router.use('/places', placeId)
  router.use('/maps', maps)
  router.use('/contact', contact)
}

export default apiRouter
