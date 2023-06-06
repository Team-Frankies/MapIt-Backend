import { Router } from 'express'
import {
  getCommentsByPlace,
  getCommentByUserIdAndPlaceId,
  getCommentsRate,
  postComment,
  updateComment,
  deleteComment
} from '../controllers/comment.controller.js'
import { verifyToken as auth } from '../middlewares/auth.middleware.js'
import { paginatedResults } from '../middlewares/paginatedResults.js'
import Comment from '../models/comment.model.js'

const commentRouter = Router()

commentRouter.get('/comments/places/:placeId/:userId', auth, paginatedResults(Comment), getCommentsByPlace)

commentRouter.get('/comments/user/:userId/:placeId', auth, getCommentByUserIdAndPlaceId)

commentRouter.get('/comments/rate/:placeId', auth, getCommentsRate)

commentRouter.post('/comments', auth, postComment)

commentRouter.patch('/comments/:id', auth, updateComment)

commentRouter.delete('/comments/:id', auth, deleteComment)

export default commentRouter
