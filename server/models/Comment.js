const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        commentBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }

);

module.exports = commentSchema;
