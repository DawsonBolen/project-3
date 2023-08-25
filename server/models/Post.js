const mongoose = require('mongoose');

const Comment = require('./Comment');

const { Schema } = mongoose;

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postBody: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    square: {
        type: Schema.Types.ObjectId,
        ref: 'Square',
        required: true
    },
    comments: [Comment],
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
{
    toJSON: {
        getters: true,
    },
    id: false,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
