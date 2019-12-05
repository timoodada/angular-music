import {combineReducers} from 'redux-immutable';

import ranks from './ranks';
import banners from './banners';

export default combineReducers({
  ranks,
  banners
});
