import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Music} from '../player';
import {isEmpty, prefixStyle} from '../../helpers/util';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';
import {PlayerEventService} from '../player/player-event.service';
import {ModalService} from '../../services/modal/modal.service';
import {PlayModeService} from '../../stores/actions/play-mode/play-mode.service';
import {PlayMode} from '../player/player.core';

const transform = prefixStyle('transform');
const backdropFilter = prefixStyle('backdropFilter');
const HEAD_HEIGHT = 42;

interface Info {
  ListName?: string;
  pic_h5?: string;
  pic_v12?: string;
}

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {
  @Input()
  list: Music[] = [];
  private _info: Info = {};
  @Input()
  get info() {
    return this._info;
  }
  set info(val) {
    if (!isEmpty(val)) {
      this._info = val;
      let bkg;
      if (/\.(png|jpe?g)\??.*$/.test(val.pic_h5)) {
        bkg = val.pic_h5;
      } else {
        bkg = val.pic_v12;
      }
      this.bgImage.nativeElement.style.backgroundImage = `url(${bkg})`;
    }
  }
  @Input()
  public loading = false;
  @Input()
  public rank = true;
  @ViewChild('layer', {static: true})
  public layer: any;
  @ViewChild('playBtn', {static: false})
  public playBtn: any;
  @ViewChild('bgImage', {static: true})
  public bgImage: any;
  @ViewChild('filter', {static: true})
  public filter: any;
  @ViewChild('listWrapper', {static: true})
  public listWrapper: any;
  @ViewChild(ScrollYComponent, {static: true})
  public scrollY: any;
  @ViewChild('title', {static: true})
  public title: any;
  public imgHeight = 0;

  constructor(
    private playListService: PlayListService,
    private playerEvent: PlayerEventService,
    private modal: ModalService,
    private playMode: PlayModeService
  ) {}

  ngOnInit() {
    this.imgHeight = this.bgImage.nativeElement.clientHeight;
    this.listWrapper.nativeElement.style.top = `${this.imgHeight}px`;
    this.scrollY.refresh();
  }
  onScroll = pos => {
    if (!this.playBtn) {
      return;
    }
    const imgHeight = this.imgHeight;
    let blur = 0;
    let scale = 1;
    this.layer.nativeElement.style[transform] = `translate(0, ${pos.y}px)`;
    this.playBtn.nativeElement.style.display = 'block';
    const percent = Math.abs(pos.y / imgHeight);
    if (pos.y > 0) {
      scale = 1 + percent;
      this.bgImage.nativeElement.style.zIndex = 10;
    } else {
      scale = 1;
      blur = Math.min(percent * 20, 20);
      this.title.nativeElement.style.opacity = percent;
      if (pos.y < HEAD_HEIGHT - imgHeight) {
        this.bgImage.nativeElement.style.zIndex = 10;
        this.bgImage.nativeElement.style.paddingTop = 0;
        this.bgImage.nativeElement.style.height = `${HEAD_HEIGHT}px`;
        this.playBtn.nativeElement.style.display = 'none';
      } else {
        this.bgImage.nativeElement.style.zIndex = 0;
        this.bgImage.nativeElement.style.paddingTop = '70%';
        this.bgImage.nativeElement.style.height = 0;
      }
    }
    this.bgImage.nativeElement.style[transform] = `scale(${scale})`;
    this.filter.nativeElement.style[backdropFilter] = `blur(${blur}px)`;
  }
  back = () => {
    history.go(-1);
  }
  getValidList = () => {
    return this.list.filter(val => !val.vip);
  }
  randomPlay = () => {
    const list = this.getValidList();
    if (list.length <= 0) {
      this.modal.alert({ content: '没有可以播放的歌曲' }).then(() => {
        // closed
      });
      return;
    }
    this.playMode.setPlayMode(PlayMode.random);
    this.onClick(list[this.playListService.getRandomIndex(list.length)]);
  }
  onClick = (item: Music) => {
    if (item.vip) {
      this.modal.alert({ content: '无法播放vip歌曲' }).then(() => {
        // closed
      });
      return;
    }
    const list = this.getValidList();
    this.playListService.setPlayList(list, item)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
}
