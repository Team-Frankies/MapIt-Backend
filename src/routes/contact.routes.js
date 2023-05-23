import { Router } from 'express'
import { body } from 'express-validator'
import * as conctacController from '../controllers/contact.controller.js'
import { validate } from '../middlewares/validator.js'

const router = Router()

router.post(
  '/',
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('message').notEmpty().withMessage('Message is required')
  ]),
  conctacController.createController
)

export default router
