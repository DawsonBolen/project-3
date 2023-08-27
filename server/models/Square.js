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
    users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
          unique: true
        }
    ],
    posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

squareSchema.virtual('likes').get(function () {
    return this.users ? this.users.length : 0;
});
  
squareSchema.virtual('postCount').get(function () {
    return this.posts ? this.posts.length : 0;
});

squareSchema.index({ name: 'text' });

const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
