// Node Modules
import express from 'express';

// Routes
import authRoutes from './routes/auth.routes.js';
import commentRouter from './routes/comment.routes.js';

function apiRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRoutes);
  router.use('/comment',commentRouter);
}

export default apiRouter;
