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

export default combineReducers({
  ranks,
  banners,
  playList,
  currentSong,
  playMode,
  fullscreen,
  favorite,
  recent,
  history
});
