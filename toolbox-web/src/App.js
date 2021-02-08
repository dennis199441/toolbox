import React from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import { SecureRoute, PublicRoute, NotFound } from './common';
import { About, Home, SignIn, SignUp } from './public';
import { Profile, Dashboard, Users, Blog, Roles } from './secure';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#24248f"
    },
    secondary: {
      main: '#ffffff'
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <Switch>
            <PublicRoute restricted={false} component={Home} path="/" exact />
            <PublicRoute restricted={false} component={About} path="/about" exact />
            <PublicRoute restricted={true} component={SignIn} path="/signin" exact />
            <PublicRoute restricted={true} component={SignUp} path="/signup" exact />
            <SecureRoute component={Dashboard} path="/secure/dashboard" exact />
            <SecureRoute component={Profile} path="/secure/profile" exact />
            <SecureRoute component={Users} path="/secure/users" exact />
            <SecureRoute component={Blog} path="/secure/blog" exact />
            <SecureRoute component={Roles} path="/secure/roles" exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
