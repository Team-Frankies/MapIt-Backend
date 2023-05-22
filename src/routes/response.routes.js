import { Router } from 'express'
import { deleteCommentResponses, editCommentResponses, getCommentResponses, postCommentResponses } from '../controllers/response.controller.js'
import { verifyToken as auth } from '../middlewares/auth.middleware.js'

const responseRouter = Router()

responseRouter.get('/responses/:id', auth, getCommentResponses)
responseRouter.post('/responses', auth, postCommentResponses)
responseRouter.patch('/responses/:id', auth, editCommentResponses)
responseRouter.delete('/responses/:id', auth, deleteCommentResponses)
export default responseRouter
