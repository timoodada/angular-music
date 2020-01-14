import {Music} from '../../business/player';
import {List} from 'immutable';

const defaultState = List([]);

export default (state: List<any> = defaultState, action: any): List<Music> => {
  switch (action.type) {
    case 'SET_FAVORITE':
      return List(action.value || []);
    default:
      return state;
  }
};
