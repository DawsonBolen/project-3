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
    }

    type Post {
        _id: ID
        postTitle: String
        postBody: String
        user: User
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
    }
`;

module.exports = typeDefs;

