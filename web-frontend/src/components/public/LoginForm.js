import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';

import { appName } from '../../constants';
import auth from '../../data/Auth';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    console.log("submitForm!");
    auth.setAuthenticated(true);
  }

  render() {
    return (
      <Container> 
        <br/>
        <Card border="dark">
          <Card.Header style={{textAlign: 'center', fontSize: 20, fontFamily: 'cursive'}}>{ appName }</Card.Header>
          <Card.Body>
            <Form action="/">
              <Form.Group controlId="login">
                <Form.Control type="text" placeholder="Username or email" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password"   placeholder="Password"/>
              </Form.Group>
              <Button variant="dark" type="submit" onClick={this.submitForm} block>Sign In</Button>
            </Form>
            <Container>
              <Row className="justify-content-md-center">
                <Nav.Link href="#">Forgot password?</Nav.Link>
              </Row>
            </Container>
          </Card.Body>
        </Card>

      </Container>
    );
  }
}

export default LoginForm;