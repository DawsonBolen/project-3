const { AuthenticationError } = require('apollo-server-express');
const { User, Square, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async (parent, args, context) => {

            const users = await User.find()
                .populate('posts');

            return users
        },
        user: async (parent, args, context) => {

            const user = await User.findById(args)
                .populate('bookmarkedSquares')
                .populate('posts')
                .populate('createdSquares');

            return user
        },
        squares: async (parent, args, context) => {
            const squares = await Square.find()
                .populate('users')
                .populate('posts');

            return squares
        },
        square: async (parent, args, context) => {

            const square = await Square.findById(args)
                .populate('posts')
                .populate(
                    {
                        path: 'posts',
                        populate: {
                            path: 'user'
                        }
                    }
                )
                .populate(
                    {
                        path: 'posts',
                        populate: {
                            path: 'comments',
                            populate: { path: 'user' }
                        }
                    }
                );

            return square
        },
        posts: async (parent, args, context) => {
            const posts = await Post.find()
                .populate('user')
                .populate('square')
                .populate(
                    {
                        path: 'comments',
                        populate: { path: 'user' }
                    }
                );

            return posts
        },
        searchSquares: async (parent, args, context) => {
            const query = {
                name: { $regex: args.name, $options: 'i' }
            };

            console.log(query)

            const squares = await Square.find(query)

            return squares
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },
        createPost: async (parent, args, context) => {
            if (context.user) {
                const post = await Post.create(args);

                await User.findByIdAndUpdate(args.user, { $push: { posts: post } })

                await Square.findByIdAndUpdate(args.square, { $push: { posts: post } })


                console.log(post)
                return post;
            }
        },
        createSquare: async (parent, args, context) => {
            if (context.user) {

                const square = await Square.create(args);

                await User.findByIdAndUpdate(context.user._id, { $addToSet: { createdSquares: square._id } })

                return square;
            }
        },
        likeSquare: async (parent, args, context) => {
            if (context.user) {

                await User.findByIdAndUpdate(args.user, { $addToSet: { likedSquares: args.square } })

                await Square.findByIdAndUpdate(args.square, { $addToSet: { likes: args.user } })

                return args;
            }
        },
        saveSquare: async (parent, args, context) => {
            if (context.user) {

                await User.findByIdAndUpdate(args.user, { $addToSet: { bookmarkedSquares: args.square } })

                await Square.findByIdAndUpdate(args.square, { $addToSet: { users: args.user } })

                return args;
            }
        },
        removeBookmark: async (parent, args, context) => {
            if (context.user) {

                await User.findByIdAndUpdate(args.user, { $pull: { bookmarkedSquares: args.square } })

                await Square.findByIdAndUpdate(args.square, { $pull: { users: args.user } })

                return args;
            }
        },
        addComment: async (parent, args, context) => {
            if (context.user) {

                console.log(args)

                await Post.findByIdAndUpdate(args.post, { $push: { comments: args } })

                return args;
            }
        },
        editUser: async (parent, args, context) => {
            if (context.user) {

                const updatedUser = await User.findByIdAndUpdate(context.user._id, { $set: { image: args.image }}, { new: true })

                return updatedUser
            }
        }
    },
};

module.exports = resolvers;


