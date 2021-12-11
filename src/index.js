import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App.js';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { UserProvider } from './Context';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: 'https://petgram-server-js14-jaimeshalom.vercel.app/graphql',
});

const errorLink = onError(({ networkError }) => {
  if (networkError && networkError.result.code === 'invalid_token') {
    console.log('networkError', networkError);
    window.sessionStorage.removeItem('token');
    window.location.href = '/';
  }
});

// use with apollo-client
const link = errorLink.concat(httpLink);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = window.sessionStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <App />
    </UserProvider>
  </ApolloProvider>,
  document.getElementById('app')
);
