import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Music} from '../player';
import {prefixStyle} from '../../helpers/util';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';
import {PlayerEventService} from '../player/player-event.service';

const transform = prefixStyle('transform');
const backdropFilter = prefixStyle('backdropFilter');
const HEAD_HEIGHT = 42;

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})
export class MusicListComponent implements OnInit {
  @Input()
  list: Music[] = [];
  private _info = null;
  @Input()
  get info() {
    return this._info;
  }
  set info(val) {
    this._info = val;
    if (val) {
      this.bgImage.nativeElement.style.backgroundImage = `url(${val.pic_h5})`;
    }
  }
  @ViewChild('layer', {static: true})
  public layer: any;
  @ViewChild('playBtn', {static: true})
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
    private playerEvent: PlayerEventService
  ) {}

  ngOnInit() {
    this.imgHeight = this.bgImage.nativeElement.clientHeight;
    this.listWrapper.nativeElement.style.top = `${this.imgHeight}px`;
    this.scrollY.refresh();
  }
  onScroll = pos => {
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
    // 高斯模糊处理(ios)
    this.filter.nativeElement.style[backdropFilter] = `blur(${blur}px)`;
  }
  back = () => {
    history.go(-1);
  }
  onClick = (item: Music) => {
    const list = this.list.filter(val => !val.vip);
    this.playListService.setPlayList(list, item)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
}
