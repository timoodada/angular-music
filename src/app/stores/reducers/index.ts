import {combineReducers} from 'redux-immutable';

import userInfo from './userinfo';
import ranks from './ranks';
import banners from './banners';

export default combineReducers({
  userInfo,
  ranks,
  banners
});
