import React from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { appName } from '../../constants';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    console.log("sign in!");
  }

  render() {
    return (
      <Container> 
        <br/>
        <Card border="dark">
          <Card.Header style={{textAlign: 'center', fontSize: 20, fontFamily: 'cursive'}}>{ appName }</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="login">
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group controlId="formBasicMobile">
                <Form.Control type="number" placeholder="Mobile Number" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password"   placeholder="Password"/>
              </Form.Group>
              <Button variant="dark" type="submit" onClick={this.submitForm} block>Sign Up</Button>
            </Form>
          </Card.Body>
        </Card>

      </Container>
    );
  }
}

export default RegisterForm;