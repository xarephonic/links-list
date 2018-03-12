import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem.js';

class List extends Component {
	render() {
		const {
			linksList
		} = this.props
		return (
			<div>
				<Link to='/addItem'>ADD ITEM</Link>
				{typeof(linksList) == "array" &&
					linksList.map(obj => {
						return <ListItem {...obj} />
					})
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	linksList: state.linksList
});

export default connect(mapStateToProps)(List);
