import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MusicPlayer} from './player.core';
import {Music} from './index';
import {State} from '../../stores/core';
import {PlayListService} from '../../stores/actions/play-list.service';

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

  public songReady = false;
  public player: MusicPlayer;
  @State('currentSong')
  public currentSong: Music;

  constructor(
    private playListService: PlayListService
  ) {
    this.player = new MusicPlayer();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentSong) {
      this.handleCurrentSongChange();
    }
  }

  handleCurrentSongChange = () => {
    this.playListService.play().subscribe({
      next: res => {
        console.log(res);
      }
    });
  }

}
