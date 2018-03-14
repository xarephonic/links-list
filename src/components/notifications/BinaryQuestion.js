import React, { Component } from 'react';
import { connect } from 'react-redux';

class BinaryQuestion extends Component {
  render() {
    const {
      notification: {
        showBinaryQuestion,
        binaryQuestion
      }
    } = this.props;
    return showBinaryQuestion ? (
      <div>
        <div>{binaryQuestion.message}</div>
        <button onClick={binaryQuestion.onYesClick}>
          {binaryQuestion.yesText}
        </button>
        <button onClick={binaryQuestion.onNoClick}>
          {binaryQuestion.noText}
        </button>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
});

export default connect(mapStateToProps)(BinaryQuestion);
