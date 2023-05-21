import { Schema, model } from 'mongoose'

const CommentSchema = new Schema({
  writenBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  placeId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  stars: {
    type: Number
  },
  responses: [{
    type: Schema.Types.ObjectId,
    ref: 'Response'
  }]
}, { timestamps: true })

const Comment = model('Comment', CommentSchema)

export default Comment
