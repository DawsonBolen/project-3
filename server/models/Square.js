const mongoose = require('mongoose');

const { Schema } = mongoose;
const Post = require('./Post');

const squareSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    posts: [Post.schema],
});

const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
