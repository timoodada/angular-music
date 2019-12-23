import {Component, Input, OnInit} from '@angular/core';
import {Music} from '../../player';
import delAnimation from './del.animation';

@Component({
  selector: 'app-pure-music-list',
  templateUrl: './pure-music-list.component.html',
  styleUrls: ['./pure-music-list.component.scss'],
  animations: [
    delAnimation
  ]
})
export class PureMusicListComponent implements OnInit {
  @Input()
  public list: Music[] = [];
  @Input()
  public del = false;
  @Input()
  public rank = false;
  @Input()
  public onClick: (item: Music, key: number) => void = () => {}

  constructor() { }

  getRankCls(index) {
    if (index <= 2) {
      return `icon icon${index}`;
    } else {
      return 'text';
    }
  }

  getRankText(index) {
    if (index > 2) {
      return index + 1;
    } else {
      return '';
    }
  }

  delItem = (key) => {
    this.list.splice(key, 1);
  }

  ngOnInit() {
  }

}
