export function paginatedResults (model) {
  return async (req, res, next) => {
    try {
      const { page, limit } = req.query
      const pages = parseInt(page)
      const limits = parseInt(limit)
      const skips = (pages - 1) * limits
      const endIndex = pages * limits

      const result = {}

      if (endIndex < await model.countDocuments().exec()) {
        result.next = {
          page: pages + 1,
          limit: limits
        }
      }

      if (skips > 0) {
        result.previous = {
          page: pages - 1,
          limit: limits
        }
      }
      const collectionName = await model.collection.collectionName

      if (collectionName === 'comments') {
        const { placeId } = req.params
        try {
          result.results = await model.find({ placeId }).limit(limits).skip(skips).populate('writtenBy', {
            email: 1,
            firstname: 1,
            lastname: 1
          }).populate('responses', {
            commentId: 0
          }).exec()
        } catch (error) {
          res.status(500).json({ message: error.message })
        }
      } else {
        result.results = await model.find().limit(limits).skip(skips).exec()
      }
      res.paginatedResults = result

      next()
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
