import { Injectable } from '@angular/core';
import {HttpService} from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {

  constructor(
    private http: HttpService
  ) {}

  getList = (keywords: string, page: string | number) => {
    return this.http.musicGet(`https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp`, {
      _: Date.now(),
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: keywords,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: page,
      remoteplace: 'txt.mqq.all'
    });
  }
}
