import { Injectable } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import store from '../index';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(
    private http: HttpService
  ) { }

  setUserInfo(value = {}) {
    return {
      type: 'USER_INFO',
      value
    };
  }

  getUserInfo(): any {
    return (dispatch: (val?: any) => any) => {
      setTimeout(() => {
        dispatch(this.setUserInfo({
          status: 1,
          nickname: '陈纪源'
        }));
      }, 5000);
    };
  }

  fetchUserInfo() {
    store.dispatch(this.getUserInfo());
  }
}
