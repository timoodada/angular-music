import { Injectable } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import store from '../index';
import {of} from 'rxjs';
import {tap, map, mapTo, catchError} from 'rxjs/operators';
import {getState} from '../core';

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
    };
  }

  getRanks(): any {
    return this.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
      _:	Date.now(),
      uin: 0,
      format: 'jsonp',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1
    }, 'jsonpCallback')
      .pipe(
        map(res => res.code === 0 ? res.data.topList : []),
        tap(list => store.dispatch(this.setRanks(list))),
        mapTo(getState('ranks')),
        catchError(error => getState('ranks'))
      );
  }

  fetchRanks() {
    const ranks = getState('ranks');
    if (ranks.size) {
      return of(ranks);
    }
    return this.getRanks();
  }

  updateRanks() {
    return this.getRanks();
  }
}
