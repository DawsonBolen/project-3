//MUST EDIT CODE

import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
query ($id: ID!) {
  user(_id: $id) {
    _id
    image
    savedCount
    postCount
    totalLikes
    username
    email
    posts {
      _id
      postBody
      postTitle
      square{
        _id
        name
      }
      user {
        _id
        username
      }
      comments {
        commentBody
        user {
          _id
          username
        }
      }
    }
    bookmarkedSquares {
      _id
      name
      shortDescription
      longDescription
      postCount
      image
      likesCount
    }
    createdSquares {
      _id
      name
      shortDescription
      longDescription
      postCount
      likesCount
    }
    likedSquares {
      _id
    }
  }
}
`

export const GET_SQUARES = gql`
query GET_SQUARES {
  squares {
    _id
    createdAt
    likesCount
    postCount
    name
    shortDescription
    longDescription
    image
  }
}`;

export const GET_SQUARE = gql`
query GET_SQUARE($id: ID!) {
  square(_id: $id) {
    _id
    image
    name
    shortDescription
    longDescription
    postCount
    likesCount
    posts {
      _id
      commentCount
      postTitle
      postBody
      user {
        username
        image
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

export const GET_POSTS = gql`
query GET_POSTS {
  posts {
    _id
    comments {
      _id
      commentBody
      user {
        _id
        username
      }
    }
    postBody
    postTitle
    user {
      username
    }
  }
}`