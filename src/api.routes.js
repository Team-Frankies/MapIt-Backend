// Node Modules
import express from 'express';

// Routes
import authRoutes from './routes/auth.routes.js';

function apiRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRoutes);
}

export default apiRouter;
