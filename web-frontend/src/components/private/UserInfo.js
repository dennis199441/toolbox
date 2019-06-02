import React from 'react';

import ProfilePic from '../../static/assets/blank-profile-picture.png';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FaEdit, FaStar, FaHeart } from 'react-icons/fa';

class UserInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.info.username,
      description: props.info.description,
      following: props.info.following,
      followers: props.info.followers,
    }
  }

  handleEdit() {
    console.log("Clicked Edit Profile");
  }

  handleLike() {
    console.log("Clicked Like");
  }

  handleStar() {
    console.log("Clicked Star");
  }

  buttonList() {
    return (
      <Row style={{ height: '50px' }}>
        <Col>
          <Button variant="dark" block onClick={this.handleEdit}> <FaEdit style={{verticalAlign: 'top', color:'lightgray'}} size={'24px'}/> Edit</Button>
        </Col>
        <Col>
          <Button variant="dark" block onClick={this.handleLike}> <FaHeart style={{verticalAlign: 'top', color:'crimson'}} size={'24px'}/> 100</Button>
        </Col>
        <Col>
          <Button variant="dark" block onClick={this.handleStar}> <FaStar style={{verticalAlign: 'top', color:'gold'}} size={'24px'}/> 100</Button>
        </Col>
      </Row>            
    );
  }

  render() {
    return (
      <Container>
        <br/>
        <Row className="justify-content-md-center" >
          <Col sm={4}>
            <Row className="justify-content-md-center" style={{ height: '100%' }}>
              <Container align="center">
                <br/>
                <Figure>
                  <Figure.Image
                    width={120}
                    height={120}
                    alt="profile picture"
                    src={ ProfilePic }
                    roundedCircle
                  />
                </Figure>
              </Container>
            </Row>
          </Col>
          <Col sm={8}>
            <Row style={{ height: '50px' }}>
              <Col md={12}>
                <h3>{ this.state.username }</h3>
              </Col>
            </Row>
            <Row style={{ height: '50px' }}>
              <Col md={12}>
                <p>{ this.state.description }</p>
              </Col>
            </Row>
            <Row style={{ height: '50px' }}>
              <Col>
                <h5>{ this.state.followers } Followers</h5>
              </Col>
              <Col>
                <h5>{ this.state.following } Following</h5>
              </Col>
            </Row>
            {this.buttonList()}
          </Col>
        </Row>
        <br/>
      </Container>
    );
  }
}

export default UserInfo;