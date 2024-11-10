// models/Blog.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true, minlenght: 3 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    tags: [{ type: String, index: true }],
    comments: [CommentSchema],
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);