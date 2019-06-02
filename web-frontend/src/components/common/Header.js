import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { FaUser, FaBell } from 'react-icons/fa';

import auth from '../../data/Auth';
import { appName } from '../../constants';

class HeaderButtons extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: auth.getAuthenticated()
		}

		this.handleSignout = this.handleSignout.bind(this);
	}

	handleSignout() {
		console.log(auth.getAuthenticated());
		auth.setAuthenticated(false);
	}

	render() {
		return (
	    <Nav>
	    	<Nav.Link href="#">
		    	<FaBell style={{verticalAlign: 'top', color:'#ffffff'}} size={'24px'}/>
	    	</Nav.Link>
		    <Nav.Link href="/profile">
		    	<FaUser style={{verticalAlign: 'top', color:'#ffffff'}} size={'24px'}/>
		    </Nav.Link>
	    </Nav>
		);
	}
}

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: auth.getAuthenticated()
		}
	}
	
	render() {
		if(this.state.isLoggedIn === false) {
			return (
				<Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
					<Navbar.Brand href="/" style={{fontFamily: 'cursive'}}>{ appName }</Navbar.Brand>
			    <Nav style={{ width: '80%' }} className="mr-auto">
					  <Form inline style={{ width: '100%' }}>
					    <FormControl style={{ width: '100%' }} type="text" placeholder="Search" className="mr-sm-2" />
					  </Form>
			    </Nav>
				</Navbar>
			);
		}

		return (
			<Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="/" style={{fontFamily: 'cursive'}}>{ appName }</Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav">
			    <Nav style={{ width: '80%' }} className="mr-auto">
					  <Form inline style={{ width: '100%' }}>
					    <FormControl style={{ width: '100%' }} type="text" placeholder="Search" className="mr-sm-2" />
					  </Form>
			    </Nav>
			    <HeaderButtons/>
				</Navbar.Collapse>
			</Navbar>
		);
	}

}

export default Header;
