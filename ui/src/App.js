import React, {Component} from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './Layout/Layout';
import ProtectedLayout from './Layout/ProtectedLayout';
import {isAuthenticated} from './Auth';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#1e73be',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

const CurrentLayout = isAuthenticated() ? (<ProtectedLayout/>) : (<Layout/>);

export default class App extends Component {
  render() {
    const self = this;

    return (
      <React.Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
          {CurrentLayout}
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}