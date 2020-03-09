import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../services/http/http.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {timer} from 'rxjs';
import {Music} from '../../../business/player';
import {UrlJoinService} from '../../../services/url-join/url-join.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public loading = false;
  public info = {};
  public list: Music[] = [];
  public singermid = '';

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private urlJoinService: UrlJoinService
  ) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.singermid = params.get('id');
        this.loading = true;
        return timer(300);
      })
    ).pipe(
      switchMap(() => this.getList())
    ).subscribe(() => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
  getList = () => {
    return this.http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 150,
      songstatus: 1,
      singermid: this.singermid,
      _: Date.now()
    }, 'jsonpCallback').pipe(
      tap(res => {
        if (res.code === 0) {
          this.info = {
            pic_h5: this.urlJoinService.getSingerAvatar(res.data.singer_mid),
            ListName: res.data.singer_name
          };
          this.list = res.data.list.map(item => {
            return {
              name: item.musicData.songname,
              singer: item.musicData.singer.map(val => val.name).join(','),
              album: item.musicData.albumname,
              vip: !!item.musicData.pay.payplay,
              songmid: item.musicData.songmid,
              songid: item.musicData.songid,
              duration: item.musicData.interval,
              image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.musicData.albummid}.jpg?max_age=2592000`
            };
          });
        }
      })
    );
  }

  ngOnInit() {
  }

}
