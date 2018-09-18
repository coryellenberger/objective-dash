import React, {Component} from 'react';
import {Mutation} from 'react-apollo';

import gql from 'graphql-tag';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

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
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

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

    return (
      <Mutation mutation={LOGIN}>
        {(login) => (
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon/>
              </Avatar>
              <Typography variant="headline">Sign in</Typography>
              <form className={classes.form} onSubmit={e => {
                e.preventDefault();
                login({variables: {email: state.email, password: state.password}})
                  .then(value => {
                    console.log('Logged in successfully', value);
                    localStorage.setItem('access_token', value.data.login.jwt);
                    window.location.replace(window.location.origin);
                  })
                  .catch(error => {
                    // todo notify the user
                    console.log('There was an error', error);
                  });
                console.log('Logged in?', state.email);
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
                  Login
                </Button>
              </form>
            </Paper>
          </main>
        )}
      </Mutation>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);