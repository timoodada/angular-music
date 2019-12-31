import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MusicPlayer, PlayMode} from './player.core';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';
import Lyric from 'lyric-parser';
import {FullscreenService} from '../../stores/actions/fullscreen/fullscreen.service';
import {miniAnimation, normalAnimation} from './player.animate';
import {StoresService} from '../../stores/stores.service';
import {prefixStyle} from '../../helpers/util';
import {PlayModeService} from '../../stores/actions/play-mode/play-mode.service';
import {globalEvent} from '../../helpers/event';

function timeFormat(t = 0) {
  const m = Math.round(t % 60);
  return `${Math.floor(t / 60)}:${m < 10 ? '0' + m : m}`;
}
const transform = prefixStyle('transform');
const transitionDuration = prefixStyle('transitionDuration');

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    miniAnimation,
    normalAnimation
  ]
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
  public set middleWrapper(el) {
    if (el) {
      el.nativeElement.ontouchstart = this.onTouchStart;
      el.nativeElement.ontouchmove = this.onTouchMove;
      el.nativeElement.ontouchend = this.onTouchEnd;
    }
  }
  @ViewChild('lyricList', {static: false})
  public lyricList;
  @ViewChild('middleL', {static: false})
  public middleL;
  @ViewChild('scrollY', {static: false})
  public scrollY;
  public playSongObserver: any;
  public showPlayingList = false;

  constructor(
    private playListService: PlayListService,
    private fullscreenService: FullscreenService,
    private stores: StoresService,
    private playMode: PlayModeService
  ) {
    const player = this.player = new MusicPlayer();
    player.on('onPlay', this.handleOnPlay);
    player.on('onTimeUpdate', this.handleTimeUpdate);
    player.on('onError', this.handleError);
    player.on('onEnded', this.handleOnEnded);
    this.playSongObserver = globalEvent.observe('playSong')
      .subscribe(this.handleCurrentSongChange);
  }

  ngOnInit() {}

  handleCurrentSongChange = (res: [string, string]): void => {
    this.fmtTotalTime = timeFormat(this.stores.currentSong.duration);
    const [src, lyric] = res;
    if (this.lyric) {
      this.lyric.stop();
    }
    this.lyric = new Lyric(lyric, this.handleLyric);
    this.lyricLines = this.lyric.lines;
    this.player.play(src).then(() => {
      this.lyric.play();
    });
  }
  handleOnPlay = () => {
    this.songReady = true;
    this.playing = true;
  }
  handleError = (err) => {
    this.songReady = true;
    // error occurred
  }
  handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    this.currentTime = currentTime;
    this.fmtCurrentTime = timeFormat(currentTime);
    this.percent = currentTime / this.stores.currentSong.duration;
    const parse = String(Math.ceil(currentTime));
    // correct lyric position every 10 seconds
    if (/5$/.test(parse)) {
      if (this.lyric) {
        this.lyric.seek(currentTime * 1000);
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
    this.touch.status = true;
    this.touch.startX = e.touches[0].pageX;
    this.touch.startY = e.touches[0].pageY;
  }
  onTouchMove = (e) => {
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
    this.playSongObserver.unsubscribe();
  }
}
