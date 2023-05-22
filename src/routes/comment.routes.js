import { Router } from 'express'
import {
  getCommentsByPlace,
  getComment,
  getCommentsRate,
  postComment,
  updateComment,
  deleteComment
} from '../controllers/comment.controller.js'
import { verifyToken as auth } from '../middlewares/auth.middleware.js'

const commentRouter = Router()

commentRouter.get('/comments/:placeId', auth, getCommentsByPlace)

commentRouter.get('/comments/:id', auth, getComment)

commentRouter.get('/comments/rate/:placeId', auth, getCommentsRate)

commentRouter.post('/comments', auth, postComment)

commentRouter.put('/comments/:id', auth, updateComment)

commentRouter.delete('/comments/:id', auth, deleteComment)

export default commentRouter
