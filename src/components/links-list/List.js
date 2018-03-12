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
				<Link to='/additem'>ADD ITEM</Link>
				{linksList.length &&
					linksList.map(obj => {
						return <ListItem {...obj} key={obj.title} />
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
