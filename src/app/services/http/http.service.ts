import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {queryString} from '../../helpers/query';
import {deepMerge} from '../../helpers/util';
import {compineUrl, buildUrl} from '../../helpers/url';
import {race, timer, Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

interface PostData {
  [prop: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private defaults = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    timeout: 2000
  };

  private baseUrl = '/';

  public timeout = 20000;

  constructor(
    public http: HttpClient
  ) {}

  timeoutHandler = (mission: Observable<any>): Observable<any> => {
    return race(
      mission,
      timer(this.timeout).pipe(
        map(() => throwError(new Error(`Timeout Of ${this.timeout}ms Exceeded`)))
      )
    );
  }

  post = (url: string, data?: PostData, options?: PostData): Observable<any> => {
    return this.timeoutHandler(
      this.http.post(
        compineUrl(this.baseUrl, url),
        queryString(data),
        deepMerge(this.defaults, options)
      )
    );
  }

  jsonp = (url: string, params?: any, callbackFuncName?: string): Observable<any> => {
    return this.timeoutHandler(
      this.http.jsonp(
        buildUrl(compineUrl(this.baseUrl, url), params),
        callbackFuncName
      )
    );
  }
}
