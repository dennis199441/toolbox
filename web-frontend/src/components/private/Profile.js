import React from 'react';

import { Redirect } from 'react-router-dom';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';

import UserInfo from './UserInfo';
import InterestTab from './InterestTab';
import TalentTab from './TalentTab';
import Timeline from '../common/Timeline';
import CommunityMap from '../common/CommunityMap';

import auth from '../../data/Auth';
import posts from '../../data/Post';
import user from '../../data/User';

class ProfileTabs extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 'timeline',
    };
  }

  render() {
    if(auth.getAuthenticated() === false) {
      return <Redirect to="/"/>
    }

    return (
      <Container>
        <Tabs
          id="profile-tabs"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="timeline" title="Timeline">
            <Timeline posts={posts}/>
          </Tab>
          <Tab eventKey="interest" title="Interests">
            <InterestTab />
          </Tab>
          <Tab eventKey="talent" title="Talents">
            <TalentTab />
          </Tab>
          <Tab eventKey="map" title="TalentMap">
            <h1>Visualize your community</h1>
            <CommunityMap/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.setState(user);
  }

	render() {
    return (
      <div className="Profile">
        <UserInfo info={this.state} />
        <ProfileTabs/>
      </div>
    );
	}

}

export default Profile;