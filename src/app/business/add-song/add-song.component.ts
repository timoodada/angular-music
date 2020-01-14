import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {addSongAnimation} from './animate';
import {StoresService} from '../../stores/stores.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
  animations: [
    addSongAnimation
  ],
  providers: [StoresService]
})
export class AddSongComponent implements OnInit {
  @Output()
  public closed = new EventEmitter<any>();
  @Input()
  public show = false;
  public current = 0;
  public items = ['最近播放', '搜索历史'];

  constructor(
    public stores: StoresService
  ) { }

  ngOnInit() {
  }
}
