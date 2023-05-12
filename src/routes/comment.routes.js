import { Router } from 'express'
import {
  getAllComments,
  getComment,
  postComment,
  updateComment,
  deleteComment
} from '../controllers/comment.controller.js'
import { verifyToken as auth } from '../middlewares/auth.middleware.js'

const commentRouter = Router()

commentRouter.get('/comments', auth, getAllComments)

commentRouter.post('/comments', auth, postComment)

commentRouter.get('/comments/:id', auth, getComment)

commentRouter.put('/comments/:id', auth, updateComment)

commentRouter.delete('/comments/:id', auth, deleteComment)

export default commentRouter
