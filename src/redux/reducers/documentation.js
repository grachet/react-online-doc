import {FETCH_DOCUMENTATION} from '../actions/action.types'

export default (state = null, action) => {

  switch (action.type) {
    case FETCH_DOCUMENTATION:
      return action.payload;
    default:
      return state;
  }
}
