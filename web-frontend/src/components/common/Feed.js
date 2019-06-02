import React from 'react';
import Container from 'react-bootstrap/Container';
import Timeline from './Timeline';
import Editor from '../private/Editor';

import auth from '../../data/Auth';
import posts from '../../data/Post';
import user from '../../data/User';

class Feed extends React.Component {

	buildEditor() {
		if(auth.getAuthenticated() === false) {
			return null;
		}

		return (
			<Editor user={user}/>
		);
	}
	render() {
    return (
      <Container>
      	{this.buildEditor()}
        <Timeline posts={posts}/>
      </Container>
    );
	}

}

export default Feed;