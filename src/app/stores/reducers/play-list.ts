import {Music} from '../../business/player';
import {List, Map} from 'immutable';

const defaultState = List([]);

export default (state: List<any> = defaultState, action: any): List<Map<keyof Music, any>> => {
  switch (action.type) {
    case 'SET_PLAY_LIST':
      return List(action.value);
    default:
      return state;
  }
};
