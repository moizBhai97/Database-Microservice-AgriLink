const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, required: true },
}, { timestamps: true });

const PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, required: true },
    comments: [CommentSchema],
}, { timestamps: true });

const DiscussionForumSchema = new mongoose.Schema({
    title: { type: String, required: true, minlenght: 3 },
    description: { type: String },
    posts: [PostSchema],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('DiscussionForum', DiscussionForumSchema);