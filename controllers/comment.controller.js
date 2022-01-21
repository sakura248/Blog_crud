const Comment = require('../models/comment.model')



exports.postAddComments = async(req, res, next) => {
  const { 
    commentText,
    commentId,
    blogId
  } = req.body

  const comment = new Comment({
    commentText, 
    commentId: req.comment,
    blogId
  })

  await comment.save()
  res.redirect(`/blogs/${blogId}`)
}
