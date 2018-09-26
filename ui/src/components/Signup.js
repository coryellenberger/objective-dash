import React, {Component} from 'react';
import {ApolloProvider, Mutation} from 'react-apollo';

import gql from 'graphql-tag';

import {authenticate} from '../Auth';

import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Typography
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {getClient} from "../ApolloClient";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SIGNUP = gql`
  mutation ($email: String!, $password: String!) {
    signup(email: $email, password: $password){
      id
      email
      jwt
      expirationDate
    }
  }
`;

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };

    this.history = props.history;

    this.callback = props.callback;

    this.handleChange = prop => event => {
      this.setState({[prop]: event.target.value});
    };

    this.handleMouseDownPassword = event => {
      event.preventDefault();
    };

    this.handleClickShowPassword = () => {
      this.setState(state => ({showPassword: !state.showPassword}));
    };
  }

  render() {
    const {classes} = this.props;
    const state = this.state;
    const history = this.history;
    const callback = this.callback;

    return (
      <ApolloProvider client={getClient()}>
        <Mutation mutation={SIGNUP}>
          {(signup) => (
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon/>
                </Avatar>
                <Typography variant="headline">Signup</Typography>
                <form className={classes.form} onSubmit={e => {
                  e.preventDefault();
                  signup({variables: {email: state.email, password: state.password}})
                    .then(value => {
                      console.log('Signed up successfully', value);
                      authenticate(callback, value.data.signup.jwt, value.data.signup.expirationDate);
                      history.push('/');
                    })
                    .catch(error => {
                      // todo notify the user
                      console.log('There was an error', error);
                    });
                }}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                      id="email"
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      autoFocus
                    />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                      id="adornment-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <br/>
                  <Button type="submit"
                          fullWidth
                          variant="raised"
                          color="primary"
                          className={classes.submit}>
                    Signup
                  </Button>
                </form>
              </Paper>
            </main>
          )}
        </Mutation>
      </ApolloProvider>
    );
  };
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);