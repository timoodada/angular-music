import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoresService} from '../../../stores/stores.service';
import {PlayMode} from '../player.core';
import {slideFromBottom} from './animate';

@Component({
  selector: 'app-playing-list',
  templateUrl: './playing-list.component.html',
  styleUrls: ['./playing-list.component.scss'],
  animations: [
    slideFromBottom
  ]
})
export class PlayingListComponent implements OnInit {
  @Input()
  public show = false;
  @Output()
  public closed = new EventEmitter<any>();
  public playModes = PlayMode;
  public get playModeName() {
    switch (this.stores.playMode) {
      case PlayMode.loop:
        return '单曲循环';
      case PlayMode.random:
        return '随即播放';
      case PlayMode.sequence:
        return '顺序播放';
      default:
        return '';
    }
  }

  constructor(
    public stores: StoresService
  ) {}

  ngOnInit() {
  }
  stopDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
}
