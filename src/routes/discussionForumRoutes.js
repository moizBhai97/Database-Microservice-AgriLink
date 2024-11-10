const express = require('express');
const discussionForumController = require('../controllers/discussionForumController');

const router = express.Router();

router.route('/')
    .get(discussionForumController.getAllForums)
    .post(discussionForumController.createForum);

router.route('/:id')
    .get(discussionForumController.getForumById)
    .put(discussionForumController.updateForum)
    .delete(discussionForumController.deleteForum);

router.route('/:id/posts')
    .post(discussionForumController.addPost);

router.route('/:id/posts/:postId')
    .put(discussionForumController.updatePost)
    .delete(discussionForumController.deletePost);

router.route('/:id/posts/:postId/comments')
    .post(discussionForumController.addComment);

router.route('/:id/posts/:postId/comments/:commentId')
    .put(discussionForumController.updateComment)
    .delete(discussionForumController.deleteComment);

module.exports = router;