const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID
        user: User
    }

    type User {
        _id: ID
        firstName: String
        lastName: String
        username: String
        fullName: String
        email: String
        password: String
        friends: [User]
        friendCount: String
        posts: [Post]
        squares: [Square]
        createdAt: String
    }

    type Post {
        _id: ID
        postTitle: String
        postBody: String
        user: User
        comments: [Comment]
        createdAt: String
    }

    type CreatePost {
        postTitle: String
        postBody: String
        userId: ID
        squareId: ID
    }

    type Comment {
        _id: ID
        commentBody: String
        user: ID
        createdAt: String
    }

    type Square {
        _id: ID
        name: String
        description: String
        likes: String
        users: [User]
        posts: [Post]
        createdAt: String
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        squares: [Square]
        square(_id: ID!): Square
        posts: [Post]
    }

    type Mutation {
        createUser(
            firstName: String!
            lastName: String!
            email: String!
            username: String!
            password: String!
        ): Auth
        createPost(
            userId: ID!
            squareId: ID!
            postTitle: String!
            postBody: String!
        ): CreatePost
        createSquare(
            name: String!
        ): Square
        addComment(
            commentBody: String!
            postId: ID!
            userId: ID!
        ): Comment
    }
`;

module.exports = typeDefs;

