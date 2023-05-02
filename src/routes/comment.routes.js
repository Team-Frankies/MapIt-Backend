import { Router } from "express";
import { getAllComments, getComment, postComment, updateComment, deleteComment} from "../controllers/comment.controller.js";

const commentRouter = Router();

commentRouter.get("/get-all-comments", getAllComments);

commentRouter.post("/create-comment", postComment);

commentRouter.get("/get-comment/:id", getComment);

commentRouter.put("/update-comment/:id", updateComment);

commentRouter.delete("/delete-comment/:id", deleteComment);

export default commentRouter;