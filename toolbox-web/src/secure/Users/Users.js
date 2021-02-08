import logo from '../../logo.svg';
import { NavBar } from '../../common';

export default function Users() {
    return (
        <div className="App">
            <NavBar />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Users
                </a>
            </header>
        </div>
    )
}