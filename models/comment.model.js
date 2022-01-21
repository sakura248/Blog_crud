const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  commentText: {
    type: String,
    required: true
  },
  commentId:{
    type: Schema.Types.ObjectId,
  },
  blogId: {
    type: String
  }
})


module.exports = mongoose.model('Comment', commentSchema)