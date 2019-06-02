import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Interest extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			img: this.props.img,
			interest_id: this.props.interest_id,
			title: this.props.title,
		}

		this.viewThread = this.viewThread.bind(this);
	}

	viewThread() {
		let id = this.state.interest_id;
		console.log("Click Thread: {" + id + "}");
	}

	render() {
		return (
			<Container style={{ padding: '5px'}}>
				<Card style={{ width: '100%' }}>
				  <Card.Img variant="top" style={{ height: '12rem'}} src={this.state.img} />
				  <Card.Body>
				    <Card.Title>{ this.state.title }</Card.Title>
				    <Button onClick={this.viewThread} variant="dark">View Threads</Button>
				  </Card.Body>
				</Card>
			</Container>
		);
	}
}

export default Interest