import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {SearchApiService} from '../../services/api/search-api.service';
import {Music} from '../player';
import {Subscription} from 'rxjs';
import {UrlJoinService} from '../../services/url-join/url-join.service';
import vip from '../pure-music-list/vip.png';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {ModalService} from '../../services/modal/modal.service';
import {HistoryService} from '../../stores/actions/history/history.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnChanges {
  @Input()
  public keywords = '';
  @Input()
  public showSinger = false;
  @Output()
  public clicked = new EventEmitter<Music>();
  @ViewChild('scrollY', {static: false})
  private scrollY: ScrollYComponent;
  public page = 1;
  public list: Music[] = [];
  public totalnum = 0;
  public subscription: Subscription;
  public zhida: any;
  public vip = vip;
  public loading = false;
  public get showEmpty() {
    return (!this.showSinger || !this.zhida || this.zhida.type !== 2) && !this.list.length && !this.loading;
  }
  constructor(
    private searchApi: SearchApiService,
    private modal: ModalService,
    private historyService: HistoryService,
    public urlJoinService: UrlJoinService,
    private router: Router
  ) {}

  getList = () => {
    if (this.page <= 1) {
      this.list = [];
      this.loading = true;
    }
    this.searchApi.getList(this.keywords, this.page).subscribe(res => {
      if (res.code === 0) {
        this.list = this.list.concat(res.data.song.list.map(item => {
          return {
            name: item.songname,
            singer: item.singer.map(val => val.name).join(','),
            album: item.albumname,
            vip: !!item.pay.payplay,
            songmid: item.songmid,
            songid: item.songid,
            duration: item.interval,
            image: this.urlJoinService.getSongAlbum(item.albummid)
          };
        }));
        this.zhida = res.data.zhida;
        this.totalnum = res.data.song.totalnum;
        if (this.scrollY) {
          this.scrollY.finishPullUp();
          if (this.totalnum <= this.list.length) {
            this.scrollY.closePullUp();
          }
        }
      }
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }
  onPullingUp = () => {
    this.page += 1;
    this.getList();
  }
  handleClickSong = (item: Music, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (item.vip) {
      this.modal.alert({ content: `${item.name}为vip歌曲，无法播放` });
      return;
    }
    this.historyService.add(this.keywords);
    this.clicked.emit(item);
  }
  onKeywordsChange = () => {
    if (!this.keywords) { return; }
    if (this.subscription) { this.subscription.unsubscribe(); }
    if (this.scrollY) { this.scrollY.openPullUp(); }
    this.page = 1;
    this.getList();
  }
  goSingerDetail = () => {
    this.router.navigate([`/search/${this.zhida.singermid}`]);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.keywords) {
      this.onKeywordsChange();
    }
  }
  ngOnInit() {}
}
