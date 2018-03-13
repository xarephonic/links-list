import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideBinaryQuestion } from './ducks/index.js';

class BinaryQuestion extends Component {
  render() {
    const {
      dispatch,
      notification: {
        showBinaryQuestion,
        binaryQuestion
      }
    } = this.props;
    return showBinaryQuestion ? (
      <div>
        <button onClick={() => { dispatch(hideToast()) } }>X</button>
        <div>{toast.message}</div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
});

export default BinaryQuestion
