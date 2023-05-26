import Comment from '../models/comment.model.js'
import User from '../models/user.model.js'

const getCommentsByPlace = async (req, res) => {
  try {
    // const { page, limit } = req.query
    const { userId } = req.params
    // const pages = parseInt(page) || 1
    // const limits = parseInt(limit) || 4
    // const skips = (pages - 1) * limits
    const currentUser = await User.findById(userId)
    // const comments = await Comment.find({ placeId })
    //   .limit(limits)
    //   .skip(skips)
    //   .populate('writtenBy', {
    //     email: 1,
    //     firstname: 1,
    //     lastname: 1
    //   }).populate('responses', {
    //     commentId: 0
    //   })

    const comments = res.paginatedResults
    const { results, next, previous } = comments
    console.log(comments)
    if (comments.length === 0) return res.status(500).json({ message: 'No comments found' })

    if (!currentUser) return res.status(500).json({ message: 'User not found' })

    return res.status(200).json({ message: 'Messages Found', previous, next, comments: results.filter(comment => comment.writtenBy._id.toString() !== currentUser._id.toString()) })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getCommentByUserIdAndPlaceId = async (req, res) => {
  try {
    const { userId, placeId } = req.params

    const currentUser = await User.findById(userId)
    const comment = await Comment.find({ writtenBy: userId, placeId }).populate('responses', { writtenBy: 0 })

    if (!currentUser) return res.status(404).json({ message: 'User not found' })
    if (!comment || comment.length === 0) return res.status(404).json({ message: 'Comment not found' })

    return res.json({ message: 'Message Found', comments: comment })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const postComment = async (req, res) => {
  try {
    const { writtenBy, placeId, content, stars } = req.body

    if (!writtenBy || !placeId) {
      return res.status(400).json({ message: 'Missing fields' })
    }

    if (!content && !stars) {
      return res.status(400).json({ message: 'Must provided a content or stars rate to comments' })
    }

    const currentUser = await User.findById(writtenBy)

    const comment = new Comment({
      writtenBy,
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

    if (content) {
      const updatedComment = await Comment.findByIdAndUpdate({ _id: id }, { content }, { new: true })
      if (!updatedComment) return res.status(404).json({ message: 'Comment not found' })

      return res.json({ message: 'Comment content Updated', comment: updatedComment })
    } else if (stars) {
      const updatedComment = await Comment.findByIdAndUpdate({ _id: id }, { stars }, { new: true })
      if (!updatedComment) return res.status(404).json({ message: 'Comment not found' })

      return res.json({ message: 'Comment rating Updated', comment: updatedComment })
    }
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
    const comments = await Comment.find({ placeId })

    if (!comments || comments.length === 0) return res.status(404).json({ message: 'Comments not found' })

    const commentsRate = (comments.reduce((acc, comment) => acc + comment.stars, 0) / comments.length).toFixed(1)

    return res.status(200).json({ message: 'Rate found', commentsRate })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export {
  getCommentsByPlace,
  getCommentByUserIdAndPlaceId,
  getCommentsRate,
  postComment,
  updateComment,
  deleteComment
}
