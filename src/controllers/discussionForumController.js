const DiscussionForum = require('../models/DiscussionForum');

const discussionForumController = {
    async getAllForums(req, res, next) {
        try {
            const forums = await DiscussionForum.find();
            res.json(forums);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getForumById(req, res, next) {
        try {
            const forum = await DiscussionForum.findById(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            res.json(forum);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createForum(req, res, next) {
        try {
            const { title, description, posts, status } = req.body;
            const forum = new DiscussionForum({ title, description, posts, status });
            await forum.save();
            res.status(201).json(forum);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateForum(req, res, next) {
        try {
            const { title, description, posts, status } = req.body;
            const forum = await DiscussionForum.findByIdAndUpdate(
                req.params.id,
                { title, description, posts, status },
                { new: true, runValidators: true }
            );
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            res.json(forum);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteForum(req, res, next) {
        try {
            const forum = await DiscussionForum.findByIdAndDelete(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            res.json(forum);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async addPost(req, res, next) {
        try {
            const { author, content } = req.body;
            const forum = await DiscussionForum.findById(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            forum.posts.push({ author, content });
            await forum.save();
            res.status(201).json(forum);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updatePost(req, res, next) {
        try {
            const { postId, content } = req.body;
            const forum = await DiscussionForum.findById(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            const post = forum.posts.id(postId);
            if (!post) {
                return next({ status: 404, message: 'Post not found' });
            }
            post.content = content;
            await forum.save();
            res.json(forum);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deletePost(req, res, next) {
        try {
            const { postId } = req.params;
            const forum = await DiscussionForum.findById(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            const post = forum.posts.id(postId);
            if (!post) {
                return next({ status: 404, message: 'Post not found' });
            }
            post.remove();
            await forum.save();
            res.json(forum);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async addComment(req, res, next) {
        try {
            const { postId, author, content } = req.body;
            const forum = await DiscussionForum.findById(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            const post = forum.posts.id(postId);
            if (!post) {
                return next({ status: 404, message: 'Post not found' });
            }
            post.comments.push({ author, content });
            await forum.save();
            res.status(201).json(forum);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateComment(req, res, next) {
        try {
            const { postId, commentId, content } = req.body;
            const forum = await DiscussionForum.findById(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            const post = forum.posts.id(postId);
            if (!post) {
                return next({ status: 404, message: 'Post not found' });
            }
            const comment = post.comments.id(commentId);
            if (!comment) {
                return next({ status: 404, message: 'Comment not found' });
            }
            comment.content = content;
            await forum.save();
            res.json(forum);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteComment(req, res, next) {
        try {
            const { postId, commentId } = req.params;
            const forum = await DiscussionForum.findById(req.params.id);
            if (!forum) {
                return next({ status: 404, message: 'Forum not found' });
            }
            const post = forum.posts.id(postId);
            if (!post) {
                return next({ status: 404, message: 'Post not found' });
            }
            const comment = post.comments.id(commentId);
            if (!comment) {
                return next({ status: 404, message: 'Comment not found' });
            }
            comment.remove();
            await forum.save();
            res.json(forum);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = discussionForumController;