import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';

// Create the Apollo Client with configuration
const client = new ApolloClient({
  // Configure Link for GraphQL
  link: ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_URI,
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

const Main = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(<Main/>, document.getElementById('root'));
registerServiceWorker();
