import Comment from '../models/comment.model.js'
import User from '../models/user.model.js'

const getAllComments = async(_,res) => {
  try{
    const comments = await Comment.find({}).populate('writenBy', {
      email: 1,
      firstname: 1,
      lastname: 1,
    });

    if(comments.length === 0) res.status(404).json({message: "No comments found"});
    
    return res.status(200).json({message:"Messages Found", comments: [...comments]});
  
  }catch(err){
    res.status(500).json({message: err.message});
  }
}

const getComment = async(req,res) => {
  try{
    const {id} = req.params;

    const comment = await Comment.findById(id).populate('writenBy', {
      email: 1,
      firstname: 1,
      lastname: 1,
    });

    if(!comment) res.status(404).json({message: "Comment not found"});

    return res.json({message: "Message Found", comments: comment});
  }catch(err){
    return res.status(500).json({message: err.message});
  }
}

const postComment = async (req,res) => {
  try{
    const {writenBy, content, stars} = req.body;
    
    if(!writenBy || !content || !stars){
      return res.status(400).json({message: "Missing fields"});
    }

    const currentUser = await User.findById(writenBy);

    const comment = new Comment({
      writenBy,
      content,
      stars,});

    const newComment = await comment.save();

    currentUser.comments = currentUser.comments.concat(newComment._id);
    await currentUser.save();

    return res.status(201).json({message: "Comment created", item: newComment});

  }catch(err){
    return res.status(500).json({message: err.message});
  }
}

const updateComment = async (req,res) => {
  try{
    const {id}= req.params;
    const {content, stars} = req.body;
    
    if(!content || !stars){
      return res.status(400).json({message: "Missing fields"});
    }
    const updatedComment = await Comment.findByIdAndUpdate({_id: id}, {content, stars}, {new: true});
    
    return res.json({message: "Comment Updated", comment: updatedComment});
  }catch(err){
    return res.status(500).json({message: err.message});
  }
}

const deleteComment = async(req,res) => {
  try{
    const {id} = req.params;
    const commentDeleted = await Comment.findByIdAndDelete(id);
    
    if(!commentDeleted) return res.status(404).json({message: "Comment not found"});

    return res.status(202).json({message: "Comment Deleted", deletedComment: commentDeleted});
  }catch(err){
    return res.status(500).json({message: err.message});
  }
}

export {
  getAllComments,
  getComment,
  postComment,
  updateComment,
  deleteComment
}