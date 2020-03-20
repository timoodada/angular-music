import { Injectable } from '@angular/core';
import {StorageService} from '../../../services/storage/storage.service';
import {HttpService} from '../../../services/http/http.service';
import {map} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import stores from '../../';
import {urlParser} from '../../../helpers/url';
import {queryParse} from '../../../helpers/query';

const sheetList = 'https://c.y.qq.com/splcloud/fcgi-bin/songlist_list.fcg?utf8=1&uin=447334358&rnd=0.4079468670735906&g_tk_new_20200303=547543278&g_tk=547543278&loginUin=447334358&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0';

function setCookie(name, value, time = 0) {
  const exp = new Date();
  exp.setTime(exp.getTime() + time);
  document.cookie = name + '=' + escape(value) + (time ? ';expires=' + exp.toUTCString() : '');
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private COOKIES = '__cookies__';
  private API_USER_INFO = '__api_user_info__';
  private API_FAVORITE = '__api_favorites__';

  constructor(
    private storage: StorageService,
    private http: HttpService
  ) {
    this.init();
  }
  setUserInfo = (value) => {
    stores.dispatch({
      type: 'SET_USER_INFO',
      value
    });
  }
  getUserInfo = (parse) => {
    this.http.get(
      parse.path.replace(parse.origin, '') + decodeURIComponent(parse.query)
    ).subscribe(res => {
      if (res.code === 0) {
        const userInfo: any = {};
        Object.keys(res.base.data.map_userinfo).forEach((key) => {
          userInfo.id = key;
          userInfo.nickname = res.base.data.map_userinfo[key].nick;
          userInfo.avatar = res.base.data.map_userinfo[key].headurl;
          userInfo.g_tk = queryParse(parse.query).g_tk;
        });
        this.setUserInfo(
          Object.assign({
            status: 1
          }, userInfo)
        );
      }
    })
  }
  init = () => {
    const url = this.storage.get(this.API_USER_INFO) as string;
    if (!url) { return; }
    const parse = urlParser(url);
    this.getUserInfo(parse);
  }
  login = (formData): Observable<any> => {
    return this.http.post('/api/login', formData)
      .pipe(map(res => {
        if (res.result === 1) {
          this.storage.set(this.COOKIES, res.data.cookies);
          this.storage.set(this.API_USER_INFO, res.data.getUserInfo);
          this.storage.set(this.API_FAVORITE, res.data.getFavorites);
          res.data.cookies.forEach(item => {
            setCookie(item.name, item.value, item.expires > 0 ? item.expires : 0);
          });
          this.init();
          return of();
        } else {
          throw throwError(new Error(res.errMsg));
        }
      }));
  }
  logout = () => {
    this.storage.remove(this.COOKIES);
    this.storage.remove(this.API_USER_INFO);
    this.storage.remove(this.API_FAVORITE);
  }
}
