import { gql } from '@apollo/client'

export const EVENTS = gql`
  query {
    events{
      _id
      title
      description
      price
      date
      creator {
        _id
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(userInput: {username:$username, email: $email, password: $password}) {
      _id
      username
      email
    }
  }
`;

export const BOOK_EVENT = gql`
  mutation BookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
      createdAt
      updatedAt
    }
  }
`;
