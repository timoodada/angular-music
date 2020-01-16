import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Music} from '../player';
import {delAnimation} from './del.animation';
import {List} from 'immutable';
import vipLogo from './vip.png';

@Component({
  selector: 'app-pure-music-list',
  templateUrl: './pure-music-list.component.html',
  styleUrls: ['./pure-music-list.component.scss'],
  animations: [
    delAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PureMusicListComponent implements OnInit {
  @Input()
  public list: Music[] | List<Music> = [];
  @Input()
  public del = false;
  @Input()
  public rank = false;
  @Output()
  public clicked = new EventEmitter<Music>();
  @Output()
  public remove = new EventEmitter<Music>();
  public vip = vipLogo;

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

  delItem = (val: Music) => {
    this.remove.emit(val);
  }

  ngOnInit() {
  }

}
