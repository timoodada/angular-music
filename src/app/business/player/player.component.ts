import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MusicPlayer} from './player.core';
import {Music} from './index';
import {State} from '../../stores/core';
import {PlayListService} from '../../stores/actions/play-list.service';
import Lyric from 'lyric-parser';
import {FullscreenService} from '../../stores/actions/fullscreen.service';

function timeFormat(t = 0) {
  const m = Math.round(t % 60);
  return `${Math.floor(t / 60)}:${m < 10 ? '0' + m : m}`;
}


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {
  public lyric: any;
  public songReady = true;
  public player: MusicPlayer;
  @State('currentSong')
  public currentSong: Music;
  @State('fullscreen')
  public fullscreen = false;
  public playing = false;
  public percent = 0;
  public currentTime = 0;
  public fmtCurrentTime = '0:00';
  public fmtTotalTime = '0:00';

  constructor(
    private playListService: PlayListService,
    private fullscreenService: FullscreenService
  ) {
    const player = this.player = new MusicPlayer();
    player.on('onPlay', this.handleOnPlay);
    player.on('onTimeUpdate', this.handleTimeUpdate);
  }

  ngOnInit() {}

  ngOnChanges = (changes: SimpleChanges): void => {
    if (changes.currentSong) {
      this.handleCurrentSongChange();
      this.fmtTotalTime = timeFormat(changes.currentSong.currentValue.duration);
    }
  }

  handleCurrentSongChange(): void {
    if (!this.songReady) { return; }
    this.songReady = false;
    this.playListService.play().subscribe({
      next: res => {
        const [src, lyric] = res;
        if (this.lyric) {
          this.lyric.stop();
        }
        this.lyric = new Lyric(lyric, this.handleLyric);
        this.player.play(src).then(() => {
          this.lyric.play();
        });
      }
    });
  }
  handleOnPlay = () => {
    this.songReady = true;
  }
  handleTimeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    this.currentTime = currentTime;
    this.fmtCurrentTime = timeFormat(currentTime);
    this.percent = currentTime / this.currentSong.duration;
  }
  handleLyric = ({txt, lineNum}) => {
    // console.log(txt, lineNum);
  }
  toggleFullscreen = () => {
    this.fullscreenService.toggleFullScreen();
  }
  play = () => {
    this.player.play();
  }
  pause = () => {
    this.player.pause();
  }
}
