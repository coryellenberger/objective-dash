import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import {isAuthenticated} from '../Auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default withRouter(PrivateRoute);