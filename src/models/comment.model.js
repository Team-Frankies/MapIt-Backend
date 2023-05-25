import { Schema, model } from 'mongoose'

const CommentSchema = new Schema({
  writtenBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  placeId: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  stars: {
    type: Number,
    max: 5,
    min: 0
  },
  responses: [{
    type: Schema.Types.ObjectId,
    ref: 'Response'
  }]
}, { timestamps: true })

const Comment = model('Comment', CommentSchema)

export default Comment
