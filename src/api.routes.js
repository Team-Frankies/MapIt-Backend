// Node Modules
import express from 'express'

// Routes
import auth from './routes/auth.routes.js'
import placeId from './routes/placeId.route.js'

function api_router(app){
    const router = express.Router()
    app.use('/api/v1', router)

    router.use('/auth-service', auth)
    router.use('/places', placeId)
    // router.use('/places', placeId)

}

export default api_router