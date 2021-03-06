import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { hideToast } from './ducks/index.js';

import { Button, Glyphicon, Alert } from 'react-bootstrap';

class Toast extends Component {
  componentDidMount() {
    this.setState({
      autoHideTime: 5000
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.hideTimeout) {
      clearTimeout(this.state.hideTimeout);
      this.setState({
        ...this.state,
        hideTimeout: undefined
      });
    }

    if(nextProps.notification.showToast) {
      const newHideTimeoutId = setTimeout(() => {
        this.props.dispatch(hideToast());
      }, this.state.autoHideTime);

      this.setState({
        ...this.state,
        hideTimeout: newHideTimeoutId
      });
    }
  }

  render() {
    const {
      dispatch,
      notification: {
        showToast,
        toast
      }
    } = this.props;
    return showToast ? (
      <Alert bsStyle={toast.color}>
        <div>{toast.message}</div>
        <Button onClick={() => { dispatch(hideToast()) } }>
          <Glyphicon glyph="glyphicon glyphicon-remove" />
        </Button>
      </Alert>
    ) : null;
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification
});

export default connect(mapStateToProps)(Toast);
