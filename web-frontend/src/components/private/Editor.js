import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

class Editor extends React.Component {
	render() {
    return (
      <Container>
	      <Card style={{marginTop: '15px', marginBottom: '15px'}}>
	        <Card.Body>
	          <Card.Title>Editor</Card.Title>
	          <Card.Text>This is an editor</Card.Text>
	        </Card.Body>
	      </Card>
      </Container>
    );
	}

}

export default Editor;