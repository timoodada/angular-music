import { Component, OnInit } from '@angular/core';
import {StoresService} from '../../stores/stores.service';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';
import {PlayMode} from '../../business/player/player.core';
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
  getValidList = () => {
    const list = this.currentTab === 0 ? this.stores.favorite : this.stores.recent;
    return list.filter(val => !val.vip);
  }
  randomPlay = () => {
    const list = this.getValidList();
    if (list.size <= 0) {
      this.modal.alert({ content: '没有可以播放的歌曲' }).then(() => {
        // closed
      });
      return;
    }
    this.playMode.setPlayMode(PlayMode.random);
    this.onClick(list[this.playListService.getRandomIndex(list.size)]);
  }
  onClick = (item: Music) => {
    if (item.vip) {
      this.modal.alert({ content: '无法播放vip歌曲' }).then(() => {
        // closed
      });
      return;
    }
    const list = this.getValidList();
    this.playListService.setPlayList(list, item)
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
