import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem.js';
import BinaryQuestion from '../notifications/BinaryQuestion.js';
import { Grid, Row, Col, ListGroup } from 'react-bootstrap';

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
				<header>
					<h1>Popular Links List</h1>
				</header>
				<Grid fluid>
					<Row>
						<Col sm={2}>
							<span>Order By:</span>
						</Col>
						<Col sm={2}>
							<select onChange={(event) => {
								dispatch(
									orderBy(event.target.value)
								);
							}}>
								<option value={-1}>No Order</option>
								<option value={0}>Most to Least Points</option>
								<option value={1}>Least to Most Points</option>
							</select>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<ListGroup>
							{linksList.linksArr &&
								linksList.linksArr.map(linkItem => {
									return <ListItem {...linkItem} key={linkItem.name+linkItem.url+linkItem.points} />
								})
							}
							</ListGroup>
						</Col>
					</Row>
					<div>
						<div>
							<Link to='/additem'>ADD NEW LINK</Link>
						</div>
					</div>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	linksList: state.linksList
});

export default connect(mapStateToProps)(List);
