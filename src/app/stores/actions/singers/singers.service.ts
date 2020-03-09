import { Injectable } from '@angular/core';
import store, {getState} from '../../';
import {FormatSingerItem, Singer} from '../../../business/player';
import {List} from 'immutable';
import {HttpService} from '../../../services/http/http.service';
import {UrlJoinService} from '../../../services/url-join/url-join.service';
import {map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;

function formatList(list: Singer[]): List<FormatSingerItem> {
  const maped = {
    hot: {
      title: HOT_NAME,
      items: []
    }
  };
  list.forEach((item, index) => {
    if (index < HOT_SINGER_LEN) {
      maped.hot.items.push(item);
    }
    const key = item.index;
    if (!maped[key]) {
      maped[key] = {
        title: key,
        items: []
      };
    }
    maped[key].items.push(item);
  });
  const nor = [];
  const hots = [];
  for (const i in maped) {
    if (/[a-zA-Z]/.test(maped[i].title)) {
      nor.push(maped[i]);
    } else if (maped[i].title === HOT_NAME) {
      hots.push(maped[i]);
    }
  }
  nor.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
  });
  return List(hots.concat(nor));
}

@Injectable({
  providedIn: 'root'
})
export class SingersService {

  constructor(
    private http: HttpService,
    private urlJoin: UrlJoinService
  ) { }
  setSingers = (list: List<FormatSingerItem>) => {
    store.dispatch({
      type: 'SET_SINGERS',
      value: list
    });
  }
  getList = (): Observable<List<FormatSingerItem>> => {
    return this.http.jsonp('https://c.y.qq.com/v8/fcg-bin/v8.fcg', {
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      pagesize: 100,
      pagenum: 1,
      _: Date.now()
    }, 'jsonpCallback')
      .pipe(
        map(res => {
          let arr = [];
          if (res.code === 0) {
            arr = res.data.list.map(item => {
              return {
                name: item.Fsinger_name,
                id: item.Fsinger_mid,
                index: item.Findex,
                avatar: this.urlJoin.getSingerAvatar(item.Fsinger_mid)
              };
            });
          } else {
            arr = [];
          }
          return formatList(arr);
        }),
        tap(list => this.setSingers(list))
      );
  }
  fetchList = (): Observable<List<FormatSingerItem>> => {
    const singers = getState('singers');
    if (singers.size) {
      return of(singers);
    }
    return this.getList();
  }
}
