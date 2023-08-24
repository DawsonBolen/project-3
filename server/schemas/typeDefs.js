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
        email: String
        password: String
        friends: [User]
        friendCount: String
        posts: [Post]
    }

    type Post {
        _id: ID
        postTitle: String
        postBody: String
        user: ID
    }

    type Square {
        _id: ID
        name: String
        posts: [Post]
    }

    type Query {
        users: [User]
        squares: [Square]
        posts: [Post]
    }

    type Mutation {
        addUser(
            firstName: String!
            lastName: String!
            email: String!
            username: String!
            password: String!
        ): Auth
        userPost(
            user: ID!
            postTitle: String!
            postBody: String!
        ): Post
    }
`;

module.exports = typeDefs;

