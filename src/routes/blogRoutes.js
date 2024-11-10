const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.route('/')
    .get(blogController.getAllBlogs)
    .post(blogController.createBlog);

router.route('/:id')
    .get(blogController.getBlogById)
    .put(blogController.updateBlog)
    .delete(blogController.deleteBlog);

router.route('/:id/comments')
    .post(blogController.addComment);

router.route('/:id/comments/:commentId')
    .put(blogController.updateComment)
    .delete(blogController.deleteComment);

module.exports = router;