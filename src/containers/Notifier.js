import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withSnackbar} from 'notistack';
import {removeNotification} from '../redux/actions/notifications';

class Notifier extends React.Component {

  displayed = [];

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate(nextProps) {
    const {notifications: newSnacks} = nextProps;
    const {notifications: currentSnacks} = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists = notExists || !currentSnacks.filter(({key}) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const {notifications = [], user} = this.props;

    notifications.forEach((notification) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(typeof notification.message === "object" ? JSON.stringify(notification.message) : notification.message , {
        ...notification.options,
        persist: notification.options.persist || (user.preference && user.preference.persistNotification) || notification.options.variant === 'error'
      });

      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeNotification(notification.key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = ({notifications, user}) => {
  return {
    notifications,
    user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({removeNotification}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSnackbar(Notifier));
