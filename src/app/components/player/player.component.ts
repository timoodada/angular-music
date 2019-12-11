import { Component, OnInit } from '@angular/core';
import {MusicPlayer} from './player.core';

function timeFormat(t = 0) {
  const m = Math.round(t % 60);
  return `${Math.floor(t / 60)}:${m < 10 ? '0' + m : m}`;
}

function unescapeHTML(lrc: string) {
  const t = document.createElement('div');
  t.innerHTML = lrc + '';
  return t.innerText;
}


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public songReady = false;
  public player: MusicPlayer;

  constructor() {
    this.player = new MusicPlayer();
  }

  ngOnInit() {
  }

}
