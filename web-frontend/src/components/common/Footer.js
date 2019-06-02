import React from 'react';
import sizeMe from 'react-sizeme';

import auth from '../../data/Auth';
import { appName } from '../../constants';

var style = {
    backgroundColor: "#ffffff",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var itemStyle = {
  display: 'inline', 
  paddingLeft: '30px'
  }

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: auth.getAuthenticated()
    }
  }

  children() {
    return (
      <ul id="horizontal-list">
        <li style={itemStyle}><a href="/about">About Us</a></li>
        <li style={itemStyle}><a href="/support">Support</a></li>
        <li style={itemStyle}><a href="/privacy">Privacy</a></li>
        <li style={itemStyle}><a href="/terms">Terms</a></li>
        <li style={itemStyle}>© 2019 { appName }</li>
      </ul>
    );
  }

  render() {
    const { width } = this.props.size;
    if(this.state.isLoggedIn === true || width < 700) {
      return null;
    }

    return (
      <div>
        <div style={phantom} />
          <div style={style}>
            {this.children()}
        </div>
      </div>
    );
  }

}

export default sizeMe()(Footer)