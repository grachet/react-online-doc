import user from "./user";
import documentation from "./documentation";
import users from "./users";
import notifications from "./notifications";
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  users,
  notifications,
  documentation
});
