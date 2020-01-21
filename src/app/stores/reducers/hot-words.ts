import {List} from 'immutable';

const defaultState = List([]);

export default (state: List<string> = defaultState, action: any): List<string> => {
  switch (action.type) {
    case 'SET_HOT_WORDS':
      return List(action.value);
    default:
      return state;
  }
};
