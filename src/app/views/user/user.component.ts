import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../stores/stores.service';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';
import {Music} from '../../business/player';
import {ModalService} from '../../services/modal/modal.service';
import {PlayModeService} from '../../stores/actions/play-mode/play-mode.service';
import {PlayerEventService} from '../../business/player/player-event.service';
import {FavoriteService} from '../../stores/actions/favorite/favorite.service';
import {RecentService} from '../../stores/actions/recent/recent.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [StoresService]
})
export class UserComponent implements OnInit {

  public currentTab = 0;
  constructor(
    public stores: StoresService,
    private playListService: PlayListService,
    private modal: ModalService,
    private playMode: PlayModeService,
    private playerEvent: PlayerEventService,
    private favoriteService: FavoriteService,
    private recentService: RecentService
  ) { }
  onTabChange = (val) => {
    this.currentTab = val;
  }
  back = () => {
    history.go(-1);
  }
  randomPlay = () => {
    const list = this.currentTab === 0 ? this.stores.favorite : this.stores.recent;
    this.playListService.randomPlay(list)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
  onClick = (item: Music) => {
    const list = this.currentTab === 0 ? this.stores.favorite : this.stores.recent;
    this.playListService.filterPlayList(item, list)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
  onDel = (val: Music) => {
    switch (this.currentTab) {
      case 0:
        this.favoriteService.toggleFavorite(val);
        break;
      case 1:
        this.recentService.del(val);
        break;
      default:
    }
  }
  clear = () => {
    const content = this.currentTab === 0 ? '确定清空我喜欢的？' : '确定清空最近播放？';
    this.modal.confirm({ content }).then(() => {
      switch (this.currentTab) {
        case 0:
          this.favoriteService.clear();
          break;
        case 1:
          this.recentService.clear();
          break;
        default:
      }
    }).catch(() => {
      // cancel
    });
  }

  ngOnInit() {
  }

}
