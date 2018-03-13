import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { hideToast } from './ducks/index.js';

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

export default connect(mapStateToProps)(Toast);
