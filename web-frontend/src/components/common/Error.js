import React from 'react';
import logo from '../../static/assets/logo.svg';
import '../../static/css/App.css';

class ErrorPage extends React.Component {

	render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Page Not Found.</p>
        </header>
      </div>
    );
	}

}

export default ErrorPage;