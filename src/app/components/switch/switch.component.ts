import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Output()
  public activeChange = new EventEmitter<number>();
  @Input()
  public active: number;
  @Input()
  public items: [string?, string?] = [];
  constructor() {}

  ngOnInit() {}
  onClick = (key) => {
    this.activeChange.emit(key);
  }
}
