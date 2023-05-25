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

const commentRouter = Router()

commentRouter.get('/comments/:placeId/:userId', auth, getCommentsByPlace)

commentRouter.get('/comments/user/:userId/:placeId', auth, getCommentByUserIdAndPlaceId)

commentRouter.get('/comments/rate/:placeId', auth, getCommentsRate)

commentRouter.post('/comments', auth, postComment)

commentRouter.patch('/comments/:id', auth, updateComment)

commentRouter.delete('/comments/:id', auth, deleteComment)

export default commentRouter
