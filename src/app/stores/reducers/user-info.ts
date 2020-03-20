import {Map} from 'immutable';

const defaultState = Map({
  status: 0 // 0:not login
});

export default (state: Map<string, any> = defaultState, action: any): Map<string, any> => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return Map(action.value || {});
    default:
      return state;
  }
};
