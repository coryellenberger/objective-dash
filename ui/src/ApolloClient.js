import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {getToken} from './Auth';

export const getClient = () => {
  // setup the headers with the access_token for authenticating on the server
  const access_token = getToken();
  const headers = {
    authorization: access_token ? `Bearer ${access_token}` : null
  };
  // Create the Apollo Client with configuration
  return new ApolloClient({
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
        credentials: 'same-origin',
        headers: headers
      })
    ]),
    cache: new InMemoryCache()
  });
};