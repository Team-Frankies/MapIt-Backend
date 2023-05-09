// Node Modules
import {Router} from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js';

router.post('/sign-up', authController.createUser);
router.post('/sign-in', authController.signIn);
router.post('/sign-out', authController.signOut);
router
  .get('/user/:id', authMiddleware.verifyToken, authController.userId)
  .put('/user/:id', authMiddleware.verifyToken, authController.updateUser);

router.get('/test-protected', authMiddleware.verifyToken, (req, res) => {
  return res.send('Tiene acceso a la ruta');
});

export default router;
