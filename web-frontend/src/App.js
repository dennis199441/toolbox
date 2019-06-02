import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/common/Home';
import Profile from './components/private/Profile';
import ErrorPage from './components/common/Error';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/profile" component={ Profile } />
            <Route component={ ErrorPage }/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
