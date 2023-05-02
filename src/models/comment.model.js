import {Schema, model} from 'mongoose';

const CommentSchema = new Schema({
  writenBy: {
    type: Schema.Types.ObjectId,
  },
  content: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
  },
}, {timestamps: true});

const Comment = model('Comment', CommentSchema);

export default Comment;