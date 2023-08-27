//MUST EDIT CODE

import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
query ($id: ID!) {
  user(_id: $id) {
    _id
    username
    email
    squares {
      _id
      name
      shortDescription
      longDescription
      postCount
      likes
    }
  }
}
`

export const GET_SQUARES = gql`
query GET_SQUARES {
  squares {
    _id
    createdAt
    likes
    postCount
    name
    shortDescription
    longDescription
  }
}`;

export const GET_SQUARE = gql`
query GET_SQUARE($id: ID!) {
  square(_id: $id) {
    _id
    name
    shortDescription
    longDescription
    postCount
    likes
    posts {
      _id
      postTitle
      postBody
      user {
        username
      }
      comments {
        _id
        user {
          _id
          username
        }
        commentBody
      }
    }
  }
}`

export const SEARCH_SQUARES = gql`
query SEARCH_SQUARES($name: String!) {
  searchSquares(name: $name) {
    _id
    createdAt
    likes
    postCount
    name
    shortDescription
    longDescription
  }
}`