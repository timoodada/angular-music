import {fromJS} from 'immutable';

interface UserInfo {
  status: number;
  [prop: string]: any;
}

const defaultState: UserInfo = fromJS({
  status: 0,
  nickname: '暂未登陆'
});

export default (state: UserInfo = defaultState, action: any): UserInfo => {
  switch (action.type) {
    case 'USER_INFO':
      return state.merge(action.value);
    default:
      return state;
  }
};
