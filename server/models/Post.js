const mongoose = require('mongoose');

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
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
