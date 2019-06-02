import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts,
    }
  }

  buildCard(post) {
    return (              
      <Card key={post.id} style={{marginTop: '15px', marginBottom: '15px'}}>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <Row>
            <Col>
              <small className="text-muted">Written by {post.author}</small>
            </Col>
          </Row>
          <Row>
            <Col>
              <small className="text-muted">Published on {post.date}</small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

	render() {
    return (
      <Container>
        {
          this.state.posts.map(post => {
            return this.buildCard(post);
          })
        }
      </Container>
    );
	}

}

export default Timeline;