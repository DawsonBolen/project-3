const { gql } = require('apollo-server');

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
        image: String
        email: String
        password: String
        friends: [User]
        friendCount: String
        posts: [Post]
        postCount: String
        createdSquares: [Square]
        likedSquares: [Square]
        totalLikes: String
        bookmarkedSquares: [Square]
        savedCount: String
        createdAt: String
    }

    type Post {
        _id: ID
        image: String
        postTitle: String
        postBody: String
        user: User
        square: Square
        comments: [Comment]
        commentCount: String
        createdAt: String
    }

    type Comment {
        _id: ID
        commentBody: String
        user: User
        post: Post
        createdAt: String
    }

    type Square {
        _id: ID
        name: String
        shortDescription: String
        longDescription: String
        image: String
        likesCount: String
        postCount: String
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
        searchSquares(name: String!): [Square]
    }

    type Mutation {
        login(
            username: String!
            email: String!
            password: String!
        ): Auth
        editUser(
            image: String!
        ): User
        createUser(
            email: String!
            username: String!
            password: String!
        ): Auth
        createPost(
            user: ID!
            square: ID!
            postTitle: String!
            postBody: String!
        ): Post
        createSquare(
            name: String!
            shortDescription: String!
            longDescription: String!
            image: String!
        ): Square
        saveSquare(
            user: ID!
            square: ID!
        ): Post
        likeSquare(
            user: ID!
            square: ID!
        ): Post
        removeBookmark(
            user: ID!
            square: ID!
        ): Post
        addComment(
            commentBody: String!
            post: ID!
            user: ID!
        ): Comment
        
    }
`;

module.exports = typeDefs;

