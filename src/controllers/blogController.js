const Blog = require('../models/Blog');

const blogController = {
    async getAllBlogs(req, res, next) {
        try {
            const blogs = await Blog.find();
            res.json(blogs);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async getBlogById(req, res, next) {
        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return next({ status: 404, message: 'Blog not found' });
            }
            res.json(blog);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async createBlog(req, res, next) {
        try {
            const { title, author, content, tags, status } = req.body;
            const blog = new Blog({ title, author, content, tags, status });
            await blog.save();
            res.status(201).json(blog);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async updateBlog(req, res, next) {
        try {
            const { title, author, content, tags, status } = req.body;
            const blog = await Blog.findByIdAndUpdate(
                req.params.id,
                { title, author, content, tags, status },
                { new: true, runValidators: true }
            );
            if (!blog) {
                return next({ status: 404, message: 'Blog not found' });
            }
            res.json(blog);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next({ status: 400, message: 'Validation Error', error });
            } else {
                next({ status: 500, message: 'Internal Server Error', error });
            }
        }
    },

    async deleteBlog(req, res, next) {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            if (!blog) {
                return next({ status: 404, message: 'Blog not found' });
            }
            res.json(blog);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    async addComment(req, res, next) {
        try {
            const { author, content } = req.body;
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return next({ status: 404, message: 'Blog not found' });
            }
            blog.comments.push({ author, content });
            await blog.save();
            res.status(201).json(blog);
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
            const { commentId, content } = req.body;
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return next({ status: 404, message: 'Blog not found' });
            }
            const comment = blog.comments.id(commentId);
            if (!comment) {
                return next({ status: 404, message: 'Comment not found' });
            }
            comment.content = content;
            await blog.save();
            res.json(blog);
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
            const { commentId } = req.params;
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return next({ status: 404, message: 'Blog not found' });
            }
            const comment = blog.comments.id(commentId);
            if (!comment) {
                return next({ status: 404, message: 'Comment not found' });
            }
            comment.remove();
            await blog.save();
            res.json(blog);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    }
};

module.exports = blogController;