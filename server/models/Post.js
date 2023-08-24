const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./User');


const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
    },
    postBody: {
        type: String,
        required: true
    },
    user: User.schema

});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
