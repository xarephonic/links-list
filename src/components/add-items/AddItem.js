import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../links-list/ducks/index.js';
import { Link } from 'react-router-dom';

class AddItem extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount () {
		this.setState({
			name: '',
			url: ''
		});
	}

	handleChange(event) {
		event.preventDefault();
		const payloadObj = {};
		payloadObj[event.target.name] = event.target.value;
		this.setState({
			...this.state,
			...payloadObj
		});
	}

	handleSubmit(event) {
		//TODO escape the values before submiting
		event.preventDefault();
		this.props.dispatch(addItem(this.state));
	}

	render() {
		return(
			<div>
				<Link to="/list">Back to List</Link>
				<h2>Add New Link</h2>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor='link-name'>Link Name</label>
					<input id='link-name' name='name' value={this.state.name} onChange={this.handleChange} />
					<label htmlFor='link-url'>Link Url</label>
					<input type='url' id='link-url' name='url' value={this.state.url} onChange={this.handleChange} />
					<input type='reset' />
					<input type='submit' value='ADD' />
				</form>
			</div>
		);
	}
}

export default connect()(AddItem);
