import React from 'react' 
import ReactDOM from 'react-dom' 
import './index.css' 
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import App from './App' 
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from "@apollo/client" 
import { getMainDefinition } from "@apollo/client/utilities" 
import { WebSocketLink } from "@apollo/client/link/ws" 
import { setContext } from "apollo-link-context" 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css" 

const httpLink = new HttpLink({
  uri: 'https://still-spire-78621.herokuapp.com/graphql',
  credentials: 'same-origin'
}) 
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') 
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
}) 

const wsLink = new WebSocketLink({
  uri: 'wss://still-spire-78621.herokuapp.com/graphql',
  options: {
    reconnect: true
  }
}) 

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query) 
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription') 
  },
  wsLink,
  authLink.concat(httpLink)
) 

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
}) 

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
) 
