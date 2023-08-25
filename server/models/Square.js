const mongoose = require('mongoose');

const { Schema } = mongoose;

const squareSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    users: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
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
  

const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
