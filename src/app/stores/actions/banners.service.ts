import { Injectable } from '@angular/core';
import {HttpService} from '../../services/http/http.service';
import store from '../index';

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

  getBanners(): any {
    return (dispatch: (val?: any) => any) => {
      this.http.jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
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
          dispatch(this.setBanners(res.data.slider));
        }
      });
    };
  }

  fetchBanners() {
    if ((store.getState() as any).get('banners').size) {
      return;
    }
    store.dispatch(this.getBanners());
  }

  updateBanners() {
    store.dispatch(this.getBanners());
  }
}
