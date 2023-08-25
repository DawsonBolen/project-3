const { AuthenticationError } = require('apollo-server-express');
const { User, Square, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async (parent, args, context) => {

            const users = await User.find().populate('posts');

            return users
        },
        user: async (parent, args, context) => {

            const user = await User.findById(args);

            return user
        },
        squares: async (parent, args, context) => {
            const squares = await Square.find();

            return squares
        },
        square: async (parent, args, context) => {

            const square = await Square.findById(args);

            return square
        },
        posts: async (parent, args, context) => {
            const posts = await Post.find().populate('user');

            return posts
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { user, token };
        },
        createPost: async (parent, args, context) => {
            // if (context.user) {
                const post = await Post.create(args);

                await User.findByIdAndUpdate(args.userId, { $push: { posts: post }})

                await Square.findByIdAndUpdate(args.squareId, { $push: { posts: post }})


                return post;
            // }
        },
        createSquare: async (parent, args) => {
            const square = await Square.create(args);
      
            return square;
        },
        addComment: async (parent, args) => {
            console.log(args)

            await Post.findByIdAndUpdate(args.postId, { $push: { comments: comment }})
      
            return comment;
        },
    },
};

module.exports = resolvers;
