import React, {Component} from 'react';
import gql from "graphql-tag";
import {ApolloProvider, Query} from "react-apollo";
import {getClient} from "../ApolloClient";

const User = gql`
  {
    currentUser {
      id
      email
    }
  }
`;

class Person extends Component {
  render() {
    return (
      <ApolloProvider client={getClient()}>
        <Query query={User}>
          {({loading, error, data}) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <div>
                <div>{data.currentUser.id}</div>
                <div>{data.currentUser.email}</div>
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  };
}

export default Person;