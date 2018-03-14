import React from 'react';
import { connect } from 'react-redux';
import { showBinaryQuestion, hideBinaryQuestion } from '../notifications/ducks/index.js';
import { removeItem, upvote, downvote } from './ducks/index.js';

const ListItem = ({
  dispatch,
  name = '',
  url = '',
  points = ''
}) => (
  <li>
    <div>{name}</div>
    <a href={url}>{url}</a>
    <div>{points}</div>
    <button onClick={
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
      Remove Item
    </button>
    <button onClick={
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
      Upvote
    </button>
    <button onClick={
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
      Downvote
    </button>
  </li>
);

export default connect()(ListItem);
