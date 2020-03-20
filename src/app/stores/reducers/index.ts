import {combineReducers} from 'redux-immutable';

import ranks from './ranks';
import banners from './banners';
import playList from './play-list';
import currentSong from './current-song';
import playMode from './play-mode';
import fullscreen from './fullscreen';
import favorite from './favorite';
import recent from './recent';
import history from './history';
import hotWords from './hot-words';
import singers from './singers';
import userInfo from './user-info';

export default combineReducers({
  ranks,
  banners,
  playList,
  currentSong,
  playMode,
  fullscreen,
  favorite,
  recent,
  history,
  hotWords,
  singers,
  userInfo
});
