import { Injectable } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import store from '../index';
import {of, Observable} from 'rxjs';
import {map, tap, mapTo, catchError} from 'rxjs/operators';
import {getState} from '../core';
import {List} from 'immutable';

type Banners = Observable<List<any>>;

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(
    private http: HttpService
  ) {}

  setBanners(value: any[]): any {
    return {
      type: 'SET_BANNERS',
      value
    };
  }

  getBanners(): Banners {
    return this.http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
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
        map(res => res.code === 0 ? res.data.slider : getState('banners')),
        tap(list => store.dispatch(this.setBanners(list))),
        mapTo(getState('banners')),
        catchError(error => getState('banners'))
      );
  }

  fetchBanners(): Banners {
    const banners = getState('banners');
    if (banners.size) {
      return of(banners);
    }
    return this.getBanners();
  }

  updateBanners(): Banners {
    return this.getBanners();
  }
}
