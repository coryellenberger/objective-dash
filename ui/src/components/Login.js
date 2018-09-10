import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextField, RaisedButton } from 'material-ui';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      id
      email
      jwt
    }
  }
`;

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      menuValue:1,
      loginRole:'student'
    }
  }
  render() {
    let email;
    let password;

    return (
      <Mutation mutation={LOGIN}>
        {(login, { data }) => (
          <MuiThemeProvider>
            <form
              onSubmit={e => {
                e.preventDefault();
                login({ variables: { email: email.input.value, password: password.input.value }})
                  .then(value => {
                    console.log('Logged in successfully', value);
                    localStorage.setItem('access_token', value.data.login.jwt);
                  })
                  .catch(error => {
                    // todo notify the user
                    console.log('There was an error', error);
                  });
                console.log('Logged in?', email.input.value);
              }}>
              <TextField
                ref={node => {
                  email = node;
                }}
                hintText="Enter your Email"
                floatingLabelText="Email"
              />
              <br/>
              <TextField
                ref={node => {
                  password = node;
                }}
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
              />
              <br/>
              <RaisedButton label="Submit" primary={true} style={style} type='submit'/>
            </form>
          </MuiThemeProvider>
        )}
      </Mutation>
    );
  }
}
const style = {
  margin: 15,
};
export default Login;