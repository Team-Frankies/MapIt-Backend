// Node Modules
import { Router } from 'express'

import * as authController from '../controllers/auth.controller.js'
import * as authMiddleware from '../middlewares/auth.middleware.js'
const router = Router()

/**
 * @openapi
 * '/api/v1/auth/sign-up':
 *  post:
 *     tags:
 *     - Register & Login
 *     summary: Register a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - firstName
 *              - lastName
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
 *              firstname:
 *                type: string
 *                default: John
 *              lastname:
 *                type: string
 *                default: Doe
 *              password:
 *                type: string
 *                default: password
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 *
 */
router.post('/sign-up', authController.createUser)

/**
 * @openapi
 * '/api/v1/auth/sign-in':
 *  post:
 *     tags:
 *     - Register & Login
 *     summary: Login the user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: test@gmail.com
 *              password:
 *                type: string
 *                default: password
 *     responses:
 *      200:
 *        description: Suscess
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 *
 */
router.post('/sign-in', authController.signIn)

/**
 * @openapi
 * '/api/v1/auth/sign-out':
 *  post:
 *     tags:
 *     - Register & Login
 *     summary: Logout the user
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *     responses:
 *      200:
 *        description: Suscess
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 *
 */
router.post('/sign-out', authController.signOut)

/**
 * @openapi
 * '/api/v1/auth/user/:id':
 *  get:
 *     tags:
 *     - User Profile
 *     summary: Get all heroes
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: ObjectId
 *                  firstname:
 *                    type: string
 *                  lastname:
 *                    type: string
 *                  email:
 *                    type: string
 *                  comments:
 *                    type: array
 *       400:
 *         description: Bad request
 */
router.get('/user/:id', authMiddleware.verifyToken, authController.userId)

/**
 * @openapi
 * '/api/v1/auth/user/:id':
 *  put:
 *     tags:
 *     - User Profile
 *     summary: Modify a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstname
 *              - lastname
 *              - current password
 *              - new password
 *            properties:
 *              firstname:
 *                type: string
 *                default: Juan
 *              lastname:
 *                type: string
 *                default: Perez
 *              password:
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.put('/user/:id', authMiddleware.verifyToken, authController.updateUser)

router.get('/test-protected', authMiddleware.verifyToken, (req, res) => {
  return res.send('Has access to protected route')
})

export default router
