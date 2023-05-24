// Node Modules
import express from 'express'
import { getPlaceId } from '../controllers/placeId.js'

const router = express.Router()
/**
 * @openapi
 * /placeId/{place_id}:
 *  get:
 *     tags:
 *     - Place ID
 *     description: Returns Google API Places details
 *     responses:
 *       200:
 *         description: Success - Returns places details
 *          content:
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
router.route('/:place_id').get(getPlaceId)

export default router
