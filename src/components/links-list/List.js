import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem.js';
import BinaryQuestion from '../notifications/BinaryQuestion.js';

import { orderBy } from './ducks/index.js';

class List extends Component {
	render() {
		const {
			dispatch,
			linksList
		} = this.props
		return (
			<div>
				<BinaryQuestion />
				<Link to='/additem'>ADD ITEM</Link>
				<select onChange={(event) => {
					dispatch(
						orderBy(event.target.value)
					);
				}}>
					<option value={-1}>No Order</option>
					<option value={0}>Order By Most to Least Points</option>
					<option value={1}>Order By Least to Most Points</option>
				</select>
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
