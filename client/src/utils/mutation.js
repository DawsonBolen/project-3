//Must Edit CODE
import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
mutation CREATE_ACCOUNT(
  $email: String!
  $username: String!
  $password: String!
  ) {
    createUser(
      email: $email
      username: $username
      password: $password
      ) {
        token
        user {
          email
          username
          password
        }
      }
}`;

export const LOGIN = gql`
mutation LOGIN($username: String!, $email: String!, $password: String!) {
  login(username: $username, email: $email, password: $password) {
    token
    user {
      email
      username
      password
    }
  }
}`;

export const CREATE_SQUARE = gql`
mutation CREATE_SQUARE($name: String!, $shortDescription: String!, $longDescription: String!, $image: String!) {
  createSquare(name: $name, shortDescription: $shortDescription, longDescription: $longDescription, image: $image) {
    image
    name
    shortDescription
    longDescription
  }
}`

export const CREATE_POST = gql`
mutation CREATE_POST($user: ID!, $square: ID!, $postTitle: String!, $postBody: String!) {
  createPost(user: $user, square: $square, postTitle: $postTitle, postBody: $postBody) {
    user {
      _id
    }
    square {
      _id
    }
    postTitle
    postBody
  }
}`

export const ADD_COMMENT = gql`
mutation ADD_COMMENT($commentBody: String!, $post: ID!, $user: ID!) {
  addComment(commentBody: $commentBody, post: $post, user: $user) {
    user {
      _id
    }
    post {
      _id
    }
    commentBody
  }
}`

export const LIKE = gql`
mutation LIKE($user: ID!, $square: ID!) {
  likeSquare(user: $user, square: $square) {
    user {
      _id
    }
    square {
      _id
    }
  }
}`

export const BOOKMARK = gql`
mutation BOOKMARK($user: ID!, $square: ID!) {
  saveSquare(user: $user, square: $square) {
    user {
      _id
    }
    square {
      _id
    }
  }
}`

export const REMOVE_BOOKMARK = gql`
mutation REMOVE_BOOKMARK($user: ID!, $square: ID!) {
  removeBookmark(user: $user, square: $square) {
    user {
      _id
    }
    square {
      _id
    }
  }
}`

export const EDIT_USER = gql`
mutation EDIT_USER($image: String!) {
  editUser(image: $image) {
    image
  }
}`

export const REMOVE_LIKE = gql`
mutation REMOVE_LIKE($user: ID!, $square: ID!) {
  removeLike(user: $user, square: $square) {
    square {
      _id
    }
    user {
      _id
    }
  }
}`

export const REMOVE_SQUARE = gql`
mutation REMOVE_SQUARE($createdSquares: ID!) {
  deleteSquare(createdSquares: $createdSquares) {
    createdSquares {
      _id
    }
  }
}`