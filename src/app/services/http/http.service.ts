import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {queryString} from '../../helpers/query';
import {deepMerge} from '../../helpers/util';
import {compileUrl, buildUrl} from '../../helpers/url';
import {race, timer, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface Data {
  [prop: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private defaults = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
  };

  private baseUrl = '/';

  public timeout = 30000;

  constructor(
    public http: HttpClient
  ) {}

  timeoutHandler = (mission: Observable<any>): Observable<any> => {
    return race(
      mission,
      timer(this.timeout).pipe(
        map(() => {
          throw new Error(`Timeout Of ${this.timeout}ms Exceeded`);
        })
      )
    );
  }

  get = (url: string, params?: Data, options?: any): Observable<any> => {
    return this.timeoutHandler(
      this.http.get(
        buildUrl(url, params),
        deepMerge(this.defaults, options)
      )
    );
  }

  post = (url: string, data?: Data | string, options?: any): Observable<any> => {
    return this.timeoutHandler(
      this.http.post(
        compileUrl(this.baseUrl, url),
        queryString(data),
        deepMerge(this.defaults, options)
      )
    );
  }

  jsonp = (url: string, params?: Data, callbackFuncName?: string): Observable<any> => {
    return this.timeoutHandler(
      this.http.jsonp(
        buildUrl(compileUrl(this.baseUrl, url), params),
        callbackFuncName
      )
    );
  }
}
