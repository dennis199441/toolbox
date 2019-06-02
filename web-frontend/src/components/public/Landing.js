import React from 'react';

import sizeMe from 'react-sizeme';

import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import Feed from '../common/Feed';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DemoPic from '../../static/assets/demo_pic.png';

var style = {
  buttonStyle: {
    color: '#007bff',
    backgroundColor: '#ffffff',
    border: 'none'
  },
  containerStyle: {
    textAlign: 'center'
  },
}

class Landing extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoginForm: true,
    }

    this.switchForm = this.switchForm.bind(this);
  }

  computeColumnWidth() {
    const { width } = this.props.size
    
    if(width < 798) {
      return false;
    } 
  
    return true;
  }

  demoPicture() {
    if(this.computeColumnWidth() === true) {
      return (
        <Col>
          <Image src={DemoPic} />
        </Col>
      );
    }
  }

  displayForm() {
    if(this.state.isLoginForm) {
      return (
        <LoginForm/>
      );
    }

    return (
      <RegisterForm/>
    );
  }

  switchForm() {
    this.setState({
      isLoginForm: !(this.state.isLoginForm)
    });
  }

  switchContent() {
    if(this.state.isLoginForm) {
      return (
        <Container>
          Do not have an account? <button style={style.buttonStyle} onClick={this.switchForm} >Sign up</button>
        </Container>
      );
    }

    return (
      <Container>
        Already have an account? <button style={style.buttonStyle} onClick={this.switchForm} >Sign in</button>
      </Container>
    );
  }

  formSwtich() {
    return (
      <Container style={style.containerStyle}>
        <br/>
        <Card>
          <Card.Body>
            {this.switchContent()}
          </Card.Body>
        </Card>
      </Container>
    );
  }

	render() {
    return (
      <Container>
        <br/>
        <Row className="justify-content-md-center">
          <Col sm={8}>
            <Feed/>
          </Col>
          <Col sm={4}>
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  {this.displayForm()}
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                  {this.formSwtich()}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
	}

}

export default sizeMe()(Landing);