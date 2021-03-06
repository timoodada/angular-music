import {Music} from '../../business/player';
import {List} from 'immutable';

const defaultState = List([]);

export default (state: List<Music> = defaultState, action: any): List<Music> => {
  switch (action.type) {
    case 'SET_REMOTE_FAVORITE':
      return List(action.value || []);
    default:
      return state;
  }
};
