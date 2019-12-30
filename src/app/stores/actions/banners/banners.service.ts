import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http/http.service';
import store from '../../index';
import {of, Observable} from 'rxjs';
import {map, tap, mapTo, catchError} from 'rxjs/operators';
import {getState} from '../../index';
import {List} from 'immutable';

type Banners = Observable<List<any>>;

@Injectable({
  providedIn: 'root'
})
export class BannersService {

  constructor(
    private http: HttpService
  ) {
  }

  setBanners(value: any[]): any {
    return {
      type: 'SET_BANNERS',
      value
    };
  }

  getBanners(): Banners {
    return this.http.musicGet('https://u.y.qq.com/cgi-bin/musicu.fcg', {
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: JSON.stringify({
        comm: {
          ct: 24
        },
        focus: {module: 'QQMusic.MusichallServer', method: 'GetFocus', param: {}}
      })
    })
      .pipe(
        map(res => {
          if (res.code === 0) {
            return res.focus.data.content.slice(0, 5).map(item => {
              return { picUrl: item.pic_info.url };
            });
          } else {
            return [];
          }
        }),
        tap(list => store.dispatch(this.setBanners(list))),
        mapTo(getState('banners')),
        catchError(error => of(getState('banners')))
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
