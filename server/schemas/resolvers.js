const { AuthenticationError } = require('apollo-server-express');
const { User, Square, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async (parent, args, context) => {
            const users = await User.find().populate('Post');

            return users
        },
        squares: async (parent, args, context) => {
            const squares = await Square.find();

            return squares
        },
        posts: async (parent, args, context) => {
            const posts = await Post.find();

            return posts
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { user, token };
        },
        userPost: async (parent, args, context) => {
            // if (context.user) {
                const post = await Post.create(args);

                await User.findByIdAndUpdate(context.user._id, { $push: { posts: post }})

                return post;
            // }
        },
    },
};

module.exports = resolvers;
