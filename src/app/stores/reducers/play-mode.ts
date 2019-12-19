import {PlayMode} from '../../business/player/player.core';
const defaultState = PlayMode.sequence;

export default (state = defaultState, action: any): PlayMode => {
  switch (action.type) {
    case 'SET_PLAY_MODE':
      return action.value;
    default:
      return state;
  }
};
