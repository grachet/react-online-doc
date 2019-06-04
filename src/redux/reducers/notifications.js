import {REMOVE_NOTIFICATION, SEND_NOTIFICATION} from '../actions/action.types'

export default (state = [], action) => {

  switch (action.type) {
    case SEND_NOTIFICATION:
      return [
        ...state,
        action.notification,
      ];

    case REMOVE_NOTIFICATION:
      return state.filter(
        notification => notification.key !== action.key,
      );

    default:
      return state;
  }
};