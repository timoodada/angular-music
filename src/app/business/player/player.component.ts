import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MusicPlayer} from './player.core';
import {Music} from './index';
import {State} from '../../stores/core';
import {PlayListService} from '../../stores/actions/play-list.service';
import Lyric from 'lyric-parser';

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

  constructor(
    private playListService: PlayListService
  ) {
    const player = this.player = new MusicPlayer();
    player.on('onPlay', this.handleOnPlay);
  }

  ngOnInit() {}

  ngOnChanges = (changes: SimpleChanges): void => {
    if (changes.currentSong) {
      this.handleCurrentSongChange();
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
  handleLyric = ({txt, lineNum}) => {
    // console.log(txt, lineNum);
  }

}
