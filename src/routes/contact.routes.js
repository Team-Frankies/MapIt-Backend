import { Router } from 'express';
import { body } from 'express-validator';
import { create } from '../controllers/contact.controller';
import { validate } from '../middlewares/validator';

const router = Router();

router.post(
	'/',
	validate([
		body('name').notEmpty().withMessage('Name is required'),
		body('email').isEmail().withMessage('Email is required'),
        body('message').notEmpty().withMessage('Message is required')
	]),
	create
);

export default router;
