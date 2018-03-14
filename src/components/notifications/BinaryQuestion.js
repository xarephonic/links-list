import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../../styles/binary-question.css';
import { Alert } from 'react-bootstrap';

class BinaryQuestion extends Component {
  render() {
    const {
      notification: {
        showBinaryQuestion,
        binaryQuestion
      }
    } = this.props;
    return showBinaryQuestion ? (
      <Alert bsStyle="warning" className="binary-question">
        <div>{binaryQuestion.message}</div>
        <button onClick={binaryQuestion.onYesClick}>
          {binaryQuestion.yesText}
        </button>
        <button onClick={binaryQuestion.onNoClick}>
          {binaryQuestion.noText}
        </button>
      </Alert>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
});

export default connect(mapStateToProps)(BinaryQuestion);
