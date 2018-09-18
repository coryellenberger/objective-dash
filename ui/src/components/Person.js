import React, {Component} from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const User = gql`
  {
    currentUser {
      id
      email
    }
  }
`;

class Example extends Component {
  render() {
    return (
      <Query query={User}>
        {({ loading, error, data }) => {
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
    );
  };
}

export default Example;