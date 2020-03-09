import {FormatSingerItem} from '../../business/player';
import {List} from 'immutable';

const defaultState = List([]);

export default (state: List<FormatSingerItem> = defaultState, action: any): List<FormatSingerItem> => {
  switch (action.type) {
    case 'SET_SINGERS':
      return List(action.value || []);
    default:
      return state;
  }
};
