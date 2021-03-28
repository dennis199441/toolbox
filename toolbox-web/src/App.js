import React from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import { SecureRoute, PublicRoute, NotFound } from './common';
import { About, Home, PublicBlog, SignIn, SignUp } from './public';
import { Profile, Dashboard, Users, UserDetails, Blog, BlogDetails, Roles, RoleDetails } from './secure';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#24248f"
    },
    secondary: {
      main: '#ff4d4d'
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
            <PublicRoute restricted={false} component={PublicBlog} path="/blog" exact />
            <PublicRoute restricted={true} component={SignIn} path="/signin" exact />
            <PublicRoute restricted={true} component={SignUp} path="/signup" exact />
            <SecureRoute component={Dashboard} path="/secure/dashboard" exact />
            <SecureRoute component={Profile} path="/secure/profile" exact />
            <SecureRoute component={Users} path="/secure/users" exact />
            <SecureRoute component={UserDetails} path="/secure/users/:username" exact />
            <SecureRoute component={Blog} path="/secure/blog" exact />
            <SecureRoute component={BlogDetails} path="/secure/blog/:id" exact />
            <SecureRoute component={Roles} path="/secure/roles" exact />
            <SecureRoute component={RoleDetails} path="/secure/roles/create" exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
