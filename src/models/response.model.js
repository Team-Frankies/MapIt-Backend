import { Schema, model } from 'mongoose'

const responseSchema = new Schema({
  writtenBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number
  },
  disLikes: {
    type: Number
  }
}, { timestamps: true })

const Response = model('Response', responseSchema)

export default Response
