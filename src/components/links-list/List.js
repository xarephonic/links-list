import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ListItem from './ListItem.js';
import BinaryQuestion from '../notifications/BinaryQuestion.js';
import { Grid, Row, Col, ListGroup, Pagination } from 'react-bootstrap';

import { getListPage, orderBy } from './ducks/index.js';

class List extends Component {
	componentWillMount () {
		this.props.dispatch(getListPage(0));
	}
	render() {
		const {
			dispatch,
			linksList
		} = this.props

		let paginationContent = [];
		if(linksList.availablePages > 0) {
			for (let i = 0; i < linksList.availablePages; i++) {
				paginationContent.push((
						<Pagination.Item
						 active={i === linksList.currentPageInd}
						 onClick={
							 () => { this.props.dispatch(getListPage(i)) }
						 }
						 key={i}
					 	>
						 {i}
					 </Pagination.Item>
				));
			}
		}

		return (
			<div>
				<BinaryQuestion />
				<header>
					<h1>Popular Links List</h1>
				</header>
				<Grid fluid>
					<Row>
						<Col sm={12}>
							<Link to='/additem'>ADD NEW LINK</Link>
						</Col>
					</Row>
					<Row>
						<Col sm={2}>
							<span>Order By:</span>
						</Col>
						<Col xs={2}>
							<select onChange={(event) => {
								dispatch(
									orderBy(event.target.value)
								);
								dispatch(
									getListPage(0)
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
							{linksList.currentPage &&
								linksList.currentPage.map(linkItem => {
									return <ListItem {...linkItem} key={linkItem.name+linkItem.url+linkItem.points} />
								})
							}
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col sm={12}>
							<Pagination>
								{paginationContent}
							</Pagination>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	linksList: state.linksList
});

export default connect(mapStateToProps)(List);
