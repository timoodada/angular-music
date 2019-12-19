import {Music} from '../../business/player';

const defaultState = null;

export default (state = defaultState, action: any): Music => {
  switch (action.type) {
    case 'SET_CURRENT_SONG':
      return action.value ? action.value : null;
    default:
      return state;
  }
};
