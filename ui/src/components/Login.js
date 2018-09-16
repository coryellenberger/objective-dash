import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
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
        {(login, {data}) => (
          <form onSubmit={e => {
            e.preventDefault();
            login({variables: {email: state.email, password: state.password}})
              .then(value => {
                console.log('Logged in successfully', value);
                localStorage.setItem('access_token', value.data.login.jwt);
              })
              .catch(error => {
                // todo notify the user
                console.log('There was an error', error);
              });
            console.log('Logged in?', state.email);
          }}>
            <FormControl className={classNames(classes.margin, classes.textField)}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
            </FormControl>
            < br/>
            <FormControl className={classNames(classes.margin, classes.textField)}>
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
            <Button variant={"outlined"} color={"primary"} style={style}
                    type={"submit"}>
              Login
            </Button>
          </form>
        )}
      </Mutation>
    );
  }
}

const style = {
  margin: 15,
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);