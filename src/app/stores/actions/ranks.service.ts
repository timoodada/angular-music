import { Injectable } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import store from '../index';

@Injectable({
  providedIn: 'root'
})
export class RanksService {

  constructor(
    private http: HttpService
  ) {}

  setRanks(value: any[]): any {
    return {
      type: 'SET_RANKS',
      value
    }
  }

  getRanks(): any {
    return (dispatch: (val?: any) => any) => {
      this.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
        _:	Date.now(),
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
      }, 'jsonpCallback').subscribe(res => {
        if (res.code === 0) {
          dispatch(this.setRanks(res.data.topList));
        }
      })
    };
  }

  fetchRanks() {
    if ((store.getState() as any).get('ranks').size) {
      return;
    }
    store.dispatch(this.getRanks());
  }

  updateRanks() {
    store.dispatch(this.getRanks());
  }
}
