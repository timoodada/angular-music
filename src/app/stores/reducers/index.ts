import {combineReducers} from 'redux-immutable';

import userInfo from './userinfo';
import ranks from './ranks';

export default combineReducers({
  userInfo,
  ranks
});
