import { Injectable } from '@angular/core';
import {List} from 'immutable';
import store, {getState} from '../../';
import {HttpService} from '../../../services/http/http.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotWordsService {

  private setHotWords = (val: List<string> | string[]) => {
    store.dispatch({
      type: 'SET_HOT_WORDS',
      value: val
    });
  }
  constructor(
    private http: HttpService
  ) {}

  updateHotWords = () => {
    return this.http.jsonp(`https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg`, {
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      uin: 0,
      needNewCode: 1,
      platform: 'h5',
      _: Date.now()
    }, 'jsonpCallback')
      .pipe(
        map(res => {
          let arr;
          if (res.code === 0) {
            arr = res.data.hotkey.slice(0, 10).map(item => item.k);
          } else {
            arr = [];
          }
          this.setHotWords(arr);
          return getState('hotWords');
        })
      );
  }
  fetchHotWords = (): Observable<List<string>> => {
    const hotWords = getState('hotWords') as List<string>;
    if (hotWords.size > 0) {
      return of(hotWords);
    }
    return this.updateHotWords();
  }
}
