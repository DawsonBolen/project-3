const mongoose = require('mongoose');

const { Schema } = mongoose;

const squareSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    shortDescription: {
        type: String,
    },
    longDescription: {
        type: String,
    },
    image: {
        type: String,
    },
    likes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        }
    ],
    users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        }
    ],
    posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post'
        }
    ],
    createdBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

squareSchema.virtual('likesCount').get(function () {
    return this.likes ? this.likes.length : 0;
});
  
squareSchema.virtual('postCount').get(function () {
    return this.posts ? this.posts.length : 0;
});

squareSchema.index({ name: 'text' });

const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
