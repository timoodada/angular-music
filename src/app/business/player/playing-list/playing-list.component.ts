import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {StoresService} from '../../../stores/stores.service';
import {PlayMode} from '../player.core';
import {slideFromBottom} from './animate';
import {Music} from '../index';
import {PlayListService} from '../../../stores/actions/play-list/play-list.service';
import {PlayModeService} from '../../../stores/actions/play-mode/play-mode.service';
import {PlayerEventService} from '../player-event.service';

@Component({
  selector: 'app-playing-list',
  templateUrl: './playing-list.component.html',
  styleUrls: ['./playing-list.component.scss'],
  animations: [
    slideFromBottom
  ],
  providers: [StoresService]
})
export class PlayingListComponent implements OnInit, OnChanges {
  @Input()
  public show = false;
  @Output()
  public closed = new EventEmitter<any>();
  @ViewChild('listContent', {static: false})
  public listContent: any;
  @ViewChild('scrollY', {static: false})
  public scrollY: any;
  public playModes = PlayMode;
  public get playModeName() {
    switch (this.stores.playMode) {
      case PlayMode.loop:
        return '单曲循环';
      case PlayMode.random:
        return '随机播放';
      case PlayMode.sequence:
        return '顺序播放';
      default:
        return '';
    }
  }

  constructor(
    public stores: StoresService,
    private playList: PlayListService,
    private playMode: PlayModeService,
    private playerEvent: PlayerEventService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show.currentValue) {
      setTimeout(this.scrollToCurrentPlaying, 20);
    }
  }

  scrollToCurrentPlaying = () => {
    const index = this.stores.playList.indexOf(this.stores.currentSong);
    if (index > -1) {
      this.scrollY.scrollToElement(
        this.listContent.nativeElement.getElementsByClassName('item')[index],
        0
      );
    }
  }
  playSong = (music: Music) => {
    this.playList.play(music)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
  changePlayMode = () => {
    this.playMode.next();
  }
  delOne = (e, music: Music) => {
    e.stopPropagation();
    e.preventDefault();
    this.playList.delOne(music)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
  stopDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
}
