import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, Divider, Drawer, IconButton, List, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom';

import Home from '../components/Home';
import Login from '../components/Login';
import Person from '../components/Person';
import PrivateRoute from '../components/PrivateRoute';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import {ApolloProvider} from 'react-apollo';

import {getClient} from '../ApolloClient';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    position: 'relative',
    display: 'flex',
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class ProtectedLayout extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes, theme} = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar
            position='absolute'
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant='title' color='inherit' noWrap>
                Objective Dash
              </Typography>
              <Avatar className={classes.avatar}>
                <SendIcon/>
              </Avatar>
            </Toolbar>
          </AppBar>
          <Drawer
            variant='permanent'
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
              </IconButton>
            </div>
            <Divider/>
            <List>
              <NavLink to={'/'} style={{textDecoration: 'none'}}>
                <ListItem button>
                  <ListItemIcon>
                    <InboxIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Inbox'/>
                </ListItem>
              </NavLink>
              <NavLink to={'/protected'} style={{textDecoration: 'none'}}>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Starred'/>
                </ListItem>
              </NavLink>
            </List>
          </Drawer>
          <ApolloProvider client={getClient()}>
            <main className={classes.content}>
              <div className={classes.toolbar}/>
              <Route exact path='/' component={Home}/>
              <Route path='/login' component={Login}/>
              <PrivateRoute path='/protected' component={Person}/>
            </main>
          </ApolloProvider>
        </div>
      </Router>
    );
  }
}

ProtectedLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ProtectedLayout);