import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MusicPlayer, PlayMode} from './player.core';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';
import Lyric from 'lyric-parser';
import {FullscreenService} from '../../stores/actions/fullscreen/fullscreen.service';
import {miniAnimation, normalAnimation} from './player.animate';
import {StoresService} from '../../stores/stores.service';
import {prefixStyle} from '../../helpers/util';
import {PlayModeService} from '../../stores/actions/play-mode/play-mode.service';
import {PlayerEventService} from './player-event.service';
import {FavoriteService} from '../../stores/actions/favorite/favorite.service';
import {RecentService} from '../../stores/actions/recent/recent.service';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {ModalService} from '../../services/modal/modal.service';

function timeFormat(t = 0) {
  const m = Math.round(t % 60);
  return `${Math.floor(t / 60)}:${m < 10 ? '0' + m : m}`;
}
const transform = prefixStyle('transform');
const transitionDuration = prefixStyle('transitionDuration');

/**
 * @Author JiYuan.Chen
 * @Description
 * inject as root component
 */
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    miniAnimation,
    normalAnimation
  ],
  providers: [StoresService]
})
export class PlayerComponent implements OnInit, OnDestroy {
  public lyric: any;
  public lyricLines = [];
  public playModes = PlayMode;
  private _songReady = true;
  public get songReady(): boolean {
    return this._songReady && this.stores.playList.size > 1;
  }
  public set songReady(bool) {
    this._songReady = bool;
  }
  public player: MusicPlayer;
  public playing = false;
  public percent = 0;
  public currentTime = 0;
  public fmtCurrentTime = '0:00';
  public fmtTotalTime = '0:00';
  public currentLyric = '';
  public currentLine = 0;
  public currentShow: 'cd' | 'lyric' = 'cd';
  public touch = {
    status: null,
    startX: null,
    startY: null,
    percent: null
  };
  @ViewChild('middleWrapper', {static: false})
  public set middleWrapper(el: ElementRef) {
    if (el) {
      el.nativeElement.ontouchstart = this.onTouchStart;
      el.nativeElement.ontouchmove = this.onTouchMove;
      el.nativeElement.ontouchend = this.onTouchEnd;
    }
  }
  @ViewChild('lyricList', {static: false})
  public lyricList: ElementRef;
  @ViewChild('middleL', {static: false})
  public middleL: ElementRef;
  @ViewChild('scrollY', {static: false})
  public scrollY: ScrollYComponent;
  public showPlayingList = false;

  constructor(
    private playListService: PlayListService,
    private fullscreenService: FullscreenService,
    private playMode: PlayModeService,
    private playerEvent: PlayerEventService,
    private modal: ModalService,
    public stores: StoresService,
    public favoriteService: FavoriteService,
    public recentService: RecentService
  ) {
    const player = this.player = new MusicPlayer();
    player.on('onPlay', this.handleOnPlay);
    player.on('onTimeUpdate', this.handleTimeUpdate);
    player.on('onError', this.handleError);
    player.on('onEnded', this.handleOnEnded);
    this.playerEvent.on('playSong', this.handleCurrentSongChange);
    this.playerEvent.on('pauseSong', this.pause);
  }

  ngOnInit() {
    this.stores.watch('currentSong', change => {
      if (!change.previousValue && change.currentValue) {
        this.resetShow();
      }
    });
  }

  resetShow = () => {
    this.showPlayingList = false;
    this.fullscreenService.setFullScreen(false);
  }
  handleCurrentSongChange = (res?: [string, string] | null): void => {
    if (!res || !this.stores.currentSong) { return; }
    if (this.stores.currentSong.vip) {
      this.modal.alert({ content: `${this.stores.currentSong.name}为vip歌曲，无法播放` });
    }
    this.fmtTotalTime = timeFormat(this.stores.currentSong.duration);
    const [src, lyric] = res;
    if (this.lyric) {
      this.lyric.stop();
    }
    this.lyric = new Lyric(lyric, this.handleLyric);
    this.lyricLines = this.lyric.lines;
    this.recentService.add(this.stores.currentSong);
    this.player.play(src).then(() => {
      this.lyric.play();
    });
  }
  handleOnPlay = () => {
    this.songReady = true;
    this.playing = true;
  }
  handleError = (err) => {
    this.modal.alert({content: err.message || 'Playing Error'}).then(() => {
      this.songReady = true;
    });
  }
  handleTimeUpdate = (e) => {
    if (!this.stores.currentSong) { return; }
    const currentTime = e.target.currentTime;
    this.currentTime = currentTime;
    this.fmtCurrentTime = timeFormat(currentTime);
    this.percent = currentTime / this.stores.currentSong.duration;
    const parse = String(Math.ceil(currentTime));
    // correct lyric position every 10 seconds
    if (/5$/.test(parse)) {
      this.correctLyric(currentTime);
    }
  }
  correctLyric = (currentTime) => {
    if (this.lyric) {
      this.lyric.seek(currentTime * 1000);
      if (!this.playing) {
        this.lyric.stop();
      }
    }
  }
  handleOnEnded = () => {
    this.songReady = false;
    this.playing = false;
    this.playListService.playNext()
      .subscribe(this.handleCurrentSongChange, this.handleError);
  }
  handleLyric = ({txt, lineNum}) => {
    this.currentLyric = txt;
    this.currentLine = lineNum;
    if (this.scrollY && this.lyricList && this.lyricList.nativeElement && this.lyricList.nativeElement.getElementsByTagName('p')[lineNum]) {
      this.scrollY.scrollToElement(this.lyricList.nativeElement.getElementsByTagName('p')[lineNum], 1000, false, true);
    }
  }
  toggleFullscreen = () => {
    this.currentShow = 'cd';
    this.fullscreenService.toggleFullScreen();
    setTimeout(() => {
      this.correctLyric(
        this.player.currentTime
      );
    }, 20);
  }
  play = () => {
    this.player.play().then(() => {
      this.playing = true;
    });
  }
  pause = () => {
    this.player.pause();
    if (this.lyric) {
      this.lyric.stop();
    }
    this.playing = false;
  }
  next = () => {
    if (!this.songReady) { return; }
    this.pause();
    this.playListService.playNext()
      .subscribe(this.handleCurrentSongChange, this.handleError);
  }
  pre = () => {
    if (!this.songReady) { return; }
    this.pause();
    this.playListService.playPre()
      .subscribe(this.handleCurrentSongChange, this.handleError);
  }
  togglePlaying = () => {
    if (!this.songReady) { return; }
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }
  togglePlayMode = () => {
    this.playMode.next();
  }
  handleProgressChange = (percent) => {
    if (!this.songReady) { return; }
    this.percent = percent;
    const time = percent * this.stores.currentSong.duration;
    this.player.currentTime = time;
    if (this.lyric) {
      this.lyric.seek(time * 1000);
    }
  }
  togglePlayingListShow = () => {
    this.showPlayingList = !this.showPlayingList;
  }
  onTouchStart = (e) => {
    e.preventDefault();
    this.touch.status = true;
    this.touch.startX = e.touches[0].pageX;
    this.touch.startY = e.touches[0].pageY;
  }
  onTouchMove = (e) => {
    e.preventDefault();
    const lyricList = this.lyricList.nativeElement;
    if (!this.touch.status) { return; }
    const offsetY = e.touches[0].pageY - this.touch.startY;
    let offsetX = e.touches[0].pageX - this.touch.startX;
    if (Math.abs(offsetY) > Math.abs(offsetX)) { return; }
    const left = this.currentShow === 'cd' ? 0 : -document.body.clientWidth;
    offsetX = Math.max(-document.body.clientWidth, Math.min(offsetX + left, 0));
    this.touch.percent = Math.abs(offsetX / document.body.clientWidth);
    lyricList.style[transform] = `translate3d(${offsetX}px, 0, 0)`;
    lyricList.style[transitionDuration] = '';
    this.middleL.nativeElement.style.opacity = 1 - this.touch.percent;

  }
  onTouchEnd = (e) => {
    e.preventDefault();
    const lyricList = this.lyricList.nativeElement;
    const middleL = this.middleL.nativeElement;
    this.touch.status = false;
    let offsetX;
    if (this.currentShow === 'cd') {
      if (this.touch.percent > 0.2) {
        offsetX = -document.body.clientWidth;
        this.currentShow = 'lyric';
        middleL.style.opacity = 0;
        this.touch.percent = 1;
      } else {
        offsetX = 0;
        this.currentShow = 'cd';
        middleL.style.opacity = 1;
        this.touch.percent = 0;
      }
    } else {
      if (this.touch.percent < 0.8) {
        offsetX = 0;
        this.currentShow = 'cd';
        middleL.style.opacity = 1;
        this.touch.percent = 0;
      } else {
        offsetX = -document.body.clientWidth;
        this.currentShow = 'lyric';
        middleL.style.opacity = 0;
        this.touch.percent = 1;
      }
    }
    lyricList.style[transform] = `translate3d(${offsetX}px, 0, 0)`;
    lyricList.style[transitionDuration] = `300ms`;
    middleL.style[transitionDuration] = `300ms`;
  }
  ngOnDestroy(): void {
    this.playerEvent.off();
  }
}
