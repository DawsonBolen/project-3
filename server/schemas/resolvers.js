const { AuthenticationError } = require('apollo-server-express');
const { User, Square, Post, Comment } = require('../models');
const { signToken } = require('../utils/auth');
const { populate } = require('../models/Post');

const resolvers = {
    Query: {
        users: async (parent, args, context) => {

            const users = await User.find()
            .populate('squares')
            .populate('posts');

            return users
        },
        user: async (parent, args, context) => {

            const user = await User.findById(args);

            return user
        },
        squares: async (parent, args, context) => {
            const squares = await Square.find()
            .populate('users')
            .populate('posts');

            return squares
        },
        square: async (parent, args, context) => {

            const square = await Square.findById(args);

            return square
        },
        posts: async (parent, args, context) => {
            const posts = await Post.find()
            .populate('user')
            .populate(
                {
                    path: 'comments',
                    populate: { path: 'user' }
                }
            );

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

                await User.findByIdAndUpdate(args.user, { $push: { posts: post }})

                await Square.findByIdAndUpdate(args.square, { $push: { posts: post }})


                console.log(post)
                return post;
            // }
        },
        createSquare: async (parent, args, context) => {
            const square = await Square.create(args);
      
            return square;
        },
        saveSquare: async (parent, args, context) => {

            await User.findByIdAndUpdate(args.user, { $push: { squares: args.square }})

            await Square.findByIdAndUpdate(args.square, { $push: { users: args.user }})
      
            return args;
        },
        addComment: async (parent, args, context) => {
            console.log(args)

            await Post.findByIdAndUpdate(args.post, { $push: { comments: args }})
      
            return args;
        },
    },
};

module.exports = resolvers;
