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

export const CREATE_EVENT = gql`
  mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
    createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
      _id
      title
      description
      price
      date
    }
  }
`

export const BOOKINGS = gql`
  query Bookings{
    bookings {
      _id
      createdAt
      event {
        _id
        title
        date
        price
      }
      user{
        username
        email
      }
    }
  }
`

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!){
    cancelBooking(bookingId: $bookingId) {
      _id
      title
    }
  }
`;

export const EVENT_ADDED = gql`
  subscription {
    eventAdded {
      _id
      title
      date
      description
    }
  }
`