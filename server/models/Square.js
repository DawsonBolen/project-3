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
    posts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Post'
        }
    ],
    
});

const Square = mongoose.model('Square', squareSchema);

module.exports = Square;
