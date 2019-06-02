import React from 'react';

import Landing from '../public/Landing';
import Feed from './Feed';
import auth from '../../data/Auth';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
    if(auth.getAuthenticated() === true) {
      return (
        <Feed/>
      );
    }

    return (
      <Landing/>
    );
	}
}

export default Home;