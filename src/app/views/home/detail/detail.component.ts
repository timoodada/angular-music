import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http/http.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Music} from '../../../business/player';
import {timer} from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  private albumId: string;
  public loading = false;
  public list: Music[] = [];
  public info: any;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.albumId = params.get('id');
        this.loading = true;
        return timer(300);
      })
    ).pipe(
      switchMap(() => this.getList())
    ).subscribe();
  }
  ngOnDestroy(): void {}

  getList = () => {
    return this.http.jsonp(`https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg`, {
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      topid: this.albumId,
      needNewCode: 1,
      uin: 0,
      tpl: 3,
      page: 'detail',
      type: 'top',
      platform: 'h5',
      _: Date.now()
    }, 'jsonpCallback').pipe(
      tap(res => {
        if (res.code === 0) {
          this.list = res.songlist.map(item => {
            return {
              name: item.data.songname,
              singer: item.data.singer.map(val => val.name).join(','),
              album: item.data.albumname,
              vip: !!item.data.pay.payplay,
              songmid: item.data.songmid,
              songid: item.data.songid,
              duration: item.data.interval,
              image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.data.albummid}.jpg?max_age=2592000`
            };
          });
          this.info = res.topinfo;
          this.loading = false;
        }
      })
    );
  }
}
