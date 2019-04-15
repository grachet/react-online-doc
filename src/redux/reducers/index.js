import user from "./user";
import documentation from "./documentation";
import users from "./users";
import {combineReducers} from 'redux';

export default combineReducers({
  user,
  users,
  documentation
});
