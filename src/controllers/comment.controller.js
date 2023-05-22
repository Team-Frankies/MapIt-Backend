import Comment from '../models/comment.model.js'
import User from '../models/user.model.js'

const getCommentsByPlace = async (req, res) => {
  try {
    const { page, limit } = req.query
    const { placeId } = req.params
    const pages = parseInt(page) || 1
    const limits = parseInt(limit) || 4
    const skips = (pages - 1) * limits

    const comments = await Comment.find({ placeId })
      .limit(limits)
      .skip(skips)
      .populate('writenBy', {
        email: 1,
        firstname: 1,
        lastname: 1
      })
    if (comments.length === 0) return res.status(404).json({ message: 'No comments found' })

    return res.status(200).json({ message: 'Messages Found', comments: [...comments] })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getComment = async (req, res) => {
  try {
    const { id } = req.params

    const comment = await Comment.findById(id).populate('writenBy', {
      email: 1,
      firstname: 1,
      lastname: 1
    }).populate('responses')

    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    return res.json({ message: 'Message Found', comments: comment })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const postComment = async (req, res) => {
  try {
    const { writenBy, placeId, content, stars } = req.body

    if (!writenBy || !content || !stars) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    const currentUser = await User.findById(writenBy)

    const comment = new Comment({
      writenBy,
      content,
      stars,
      placeId
    })

    const newComment = await comment.save()

    currentUser.comments = currentUser.comments.concat(newComment._id)
    await currentUser.save()

    return res.status(201).json({ message: 'Comment created', item: newComment })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { content, stars } = req.body

    if (!content || !stars) {
      return res.status(400).json({ message: 'Missing fields' })
    }
    const updatedComment = await Comment.findByIdAndUpdate({ _id: id }, { content, stars }, { new: true })

    return res.json({ message: 'Comment Updated', comment: updatedComment })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params
    const commentDeleted = await Comment.findByIdAndDelete(id)

    if (!commentDeleted) return res.status(404).json({ message: 'Comment not found' })

    return res.status(202).json({ message: 'Comment Deleted', deletedComment: commentDeleted })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getCommentsRate = async (req, res) => {
  try {
    const { placeId } = req.params
    console.log(placeId)
    const comments = await Comment.find({ placeId })

    if (!comments || comments.length === 0) return res.status(404).json({ message: 'Comments not found' })

    const commentsRate = (comments.reduce((acc, comment) => acc + comment.stars, 0) / comments.length).toFixed(2)

    return res.status(200).json({ message: 'Comments Found', commentsRate })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export {
  getCommentsByPlace,
  getComment,
  getCommentsRate,
  postComment,
  updateComment,
  deleteComment
}
