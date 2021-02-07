import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import { SecureRoute, PublicRoute, NotFound } from './common';
import { About, Home, SignIn, SignUp } from './public';
import { Profile, Dashboard, Users } from './secure';

function App() {
  return (
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
          <Route component={NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
