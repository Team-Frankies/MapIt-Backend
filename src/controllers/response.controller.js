import Response from '../models/response.model.js'
import Comment from '../models/comment.model.js'

const getCommentResponses = async (req, res) => {
  try {
    const { page, limit } = req.query
    const { id } = req.params

    const pages = parseInt(page) || 1
    const limits = parseInt(limit) || 4
    const skips = (pages - 1) * limits

    const comment = await Comment.findById(id)

    console.log(comment)

    const responses = await Response.find({})
      .limit(limits)
      .skip(skips)
      .populate('writenBy', {
        email: 1,
        firstname: 1,
        lastname: 1
      })

    if (responses.length === 0) return res.status(404).json({ message: 'No responses found' })

    return res.status(200).json({ message: 'Responses Found', responses: [...responses] })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const postCommentResponses = async (req, res) => {
  try {
    const { writenBy, commentId, content } = req.body

    if (!writenBy || !commentId || !content) return res.status(400).json({ message: 'Missing fields' })

    const currentComment = await Comment.findById(commentId)
    const commentResponse = new Response({
      writenBy,
      commentId,
      content
    })

    const response = await commentResponse.save()

    currentComment.responses.push(response._id)
    await currentComment.save()

    return res.status(201).json({ message: 'Response created', response })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const editCommentResponses = async (req, res) => {
  try {
    const { id } = req.params
    const { content } = req.body

    if (!content) return res.status(400).json({ message: 'Missing fields' })

    const response = await Response.findByIdAndUpdate({ _id: id }, { content }, { new: true })

    if (!response) return res.status(404).json({ message: 'Response not found' })

    return res.status(200).json({ message: 'Response updated', response })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const deleteCommentResponses = async (req, res) => {
  try {
    const { id } = req.params
    const deletedResponse = await Response.findByIdAndDelete(id)
    if (!deletedResponse) return res.status(400).json({ message: 'response not found' })

    return res.status(200).json({ message: 'Response deleted', deletedResponse })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export {
  getCommentResponses,
  postCommentResponses,
  editCommentResponses,
  deleteCommentResponses
}
