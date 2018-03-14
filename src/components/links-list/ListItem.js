import React from 'react';
import { connect } from 'react-redux';
import { showBinaryQuestion, hideBinaryQuestion } from '../notifications/ducks/index.js';
import { removeItem, upvote, downvote } from './ducks/index.js';

import { ListGroupItem, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

import '../../styles/ListItem.css';

const ListItem = ({
  dispatch,
  name = '',
  url = '',
  points = ''
}) => (
  <ListGroupItem>
    <div className="list-item-inner">
      <div>{name}</div>
      <a href={url}>{url}</a>
      <div>{points}</div>
      <Button className="remove-button" bsStyle="danger" onClick={
        () => {
          dispatch(
            showBinaryQuestion({
              message: `Do you want to remove ${name} ?`,
              onYesClick: () => {
                dispatch(
                  removeItem({
                    name,
                    url,
                    points
                  })
                );
                dispatch(hideBinaryQuestion());
              },
              yesText: 'Yes',
              onNoClick: () => {
                dispatch(hideBinaryQuestion());
              },
              noText: 'Cancel'
            })
          )
        }
      }>
        <Glyphicon glyph=" glyphicon glyphicon-remove" />
      </Button>
      <ButtonGroup>
        <Button onClick={
            () => {
              dispatch(
                upvote({
                  name,
                  url,
                  points
                })
              );
            }
        }>
          <Glyphicon glyph="glyphicon glyphicon-thumbs-up" />
        </Button>
        <Button onClick={
          () => {
            dispatch(
              downvote({
                name,
                url,
                points
              })
            );
          }
        }>
          <Glyphicon glyph="glyphicon glyphicon-thumbs-down" />
        </Button>
      </ButtonGroup>
    </div>
  </ListGroupItem>
);

export default connect()(ListItem);
