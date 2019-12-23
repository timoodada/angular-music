const defaultState = null;

export default (state = defaultState, action: any): boolean => {
  switch (action.type) {
    case 'SET_FULLSCREEN':
      return !!action.value;
    default:
      return state;
  }
};
