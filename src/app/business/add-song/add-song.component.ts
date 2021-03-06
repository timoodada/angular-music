import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {addSongAnimation} from './animate';
import {StoresService} from '../../stores/stores.service';
import {SearchListComponent} from '../search-list/search-list.component';
import {SearchBoxComponent} from '../search-box/search-box.component';
import {Music} from '../player';
import {RecentService} from '../../stores/actions/recent/recent.service';
import {ModalService} from '../../services/modal/modal.service';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';

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
  private _show = false;
  @Input()
  public get show() {
    return this._show;
  }
  public set show(val) {
    this._show = val;
    if (val) {
      this.keywords = '';
    }
  }
  @ViewChild('searchList', {static: false})
  public searchList: SearchListComponent;
  @ViewChild('searchBox', {static: false})
  public searchBox: SearchBoxComponent;
  public keywords = '';
  public current = 0;
  public items = ['最近播放', '搜索历史'];

  constructor(
    public stores: StoresService,
    private recentService: RecentService,
    private modal: ModalService,
    private playListService: PlayListService
  ) {}

  onSearch = (val) => {
    if (this.keywords === val && this.searchList) {
      this.searchList.onKeywordsChange();
    }
    this.keywords = val;
  }
  handleHistory = (val) => {
    if (this.searchBox) {
      this.searchBox.setVal(val);
    }
  }
  handleSongClick = (val: Music) => {
    this.playListService.insertTail(val).then(() => {
      this.modal.toast('歌曲添加成功');
    }).catch(err => {
      this.modal.toast(err.message);
    });
  }
  onRemove = (val: Music) => {
    this.recentService.del(val);
  }
  ngOnInit() {}
}
