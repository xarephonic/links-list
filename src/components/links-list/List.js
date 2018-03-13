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
				<ul>
				{linksList.linksArr &&
					linksList.linksArr.map(linkItem => {
						return <ListItem {...linkItem} key={linkItem.name+linkItem.url+linkItem.points} />
					})
				}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	linksList: state.linksList
});

export default connect(mapStateToProps)(List);
