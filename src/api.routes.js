import express from 'express';

import authRoutes from './routes/auth.routes.js';
import commentRouter from './routes/comment.routes.js';
import placeId from './routes/placeId.route.js';
import maps from './routes/maps.routes.js';

function apiRouter(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  
  router.use('/auth', authRoutes);
  router.use(commentRouter); 
  router.use('/places', placeId)
  router.use('/maps', maps);
}

export default apiRouter;

