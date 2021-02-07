import React from 'react';
import logo from '../logo.svg';

const NotFound = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>404 - Not Found!</p>
      <a className="App-link" href="/" rel="noopener noreferrer">
        Go Home
      </a>
    </header>
  </div>
);

export default NotFound;