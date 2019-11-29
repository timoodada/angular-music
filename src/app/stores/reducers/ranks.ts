import {List} from 'immutable';

const defaultState = List([]);

export default (state: List<any> = defaultState, action: any): List<any> => {
  switch (action.type) {
    case 'SET_RANKS':
      return List(action.value);
    default:
      return state
  }
}
