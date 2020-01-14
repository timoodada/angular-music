import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {addSongAnimation} from './animate';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss'],
  animations: [
    addSongAnimation
  ]
})
export class AddSongComponent implements OnInit {
  @Output()
  public closed = new EventEmitter<any>();
  @Input()
  public show = false;

  constructor() { }

  ngOnInit() {
  }
}
