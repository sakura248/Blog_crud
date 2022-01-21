const express = require('express')
const router = express.Router()

const blogController = require('../controllers/blog.controller')

router.get('/', blogController.getAllBlogs)

router.get('/add-blog', blogController.getAddBlogs)

router.post('/add-blog', blogController.postAddBlogs)

router.get('/blogs/:blogId', blogController.getBlogById)

router.get('/edit-blog/:blogId', blogController.getEditBlog)

router.post('/edit-blog', blogController.postEditBlog)

router.post('/delete-blog', blogController.postDeleteBlog)

// router.get('/count-like', blogController.getCountLike)

router.post('/count-like', blogController.postCountLike)
router.post('/count-dislike', blogController.postCountDislike)


module.exports = router