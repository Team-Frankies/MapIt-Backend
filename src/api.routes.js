// Node Modules
import express from 'express';

// Routes
import authRoutes from './routes/auth.routes.js';
import placeId from './routes/placeId.route.js'

function apiRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  
  router.use('/auth', authRoutes);
  router.use('/places', placeId)
}

export default apiRouter;
