import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { hideToast } from './ducks/index.js';

class Toast extends Component {
  componentDidMount() {
    this.setState({
      autoHideTime: 5000
    });
  }
  componentWillReceiveProps() {
    if(this.state.hideTimeout) {
      clearTimeout(this.state.hideTimeout);
    }

    const newHideTimeoutId = setTimeout(() => {
      this.props.dispatch(hideToast());
    }, this.state.autoHideTime);

    this.setState({
      ...this.state,
      hideTimeout: newHideTimeoutId
    });
  }

  render() {
    const {
      notification = null
    } = this.props;
    return notification && (
      <div>{notification.message}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification.toast
});

export default connect(mapStateToProps)(Toast);
