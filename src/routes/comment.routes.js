import { Router } from "express";
import { getAllComments, getComment, postComment, updateComment, deleteComment} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.get("/comments", getAllComments);

commentRouter.post("/comments", postComment);

commentRouter.get("/comments/:id", getComment);

commentRouter.put("/comments/:id", updateComment);

commentRouter.delete("/comments/:id", deleteComment);

export default commentRouter;