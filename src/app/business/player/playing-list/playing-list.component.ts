import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {StoresService} from '../../../stores/stores.service';
import {PlayMode} from '../player.core';
import {slideFromBottom} from './animate';
import {Music} from '../index';
import {PlayListService} from '../../../stores/actions/play-list/play-list.service';
import {PlayModeService} from '../../../stores/actions/play-mode/play-mode.service';
import {PlayerEventService} from '../player-event.service';
import {FavoriteService} from '../../../stores/actions/favorite/favorite.service';
import {ModalService} from '../../../services/modal/modal.service';

@Component({
  selector: 'app-playing-list',
  templateUrl: './playing-list.component.html',
  styleUrls: ['./playing-list.component.scss'],
  animations: [
    slideFromBottom
  ],
  providers: [StoresService]
})
export class PlayingListComponent implements OnInit, OnChanges {
  @Input()
  public show = false;
  @Output()
  public closed = new EventEmitter<any>();
  @ViewChild('listContent', {static: false})
  public listContent: any;
  @ViewChild('scrollY', {static: false})
  public scrollY: any;
  public playModes = PlayMode;
  public showAddSong = false;

  constructor(
    private playList: PlayListService,
    private playerEvent: PlayerEventService,
    public stores: StoresService,
    public playMode: PlayModeService,
    public favoriteService: FavoriteService,
    public modalService: ModalService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.show.currentValue) {
      setTimeout(this.scrollToCurrentPlaying, 20);
    }
  }

  scrollToCurrentPlaying = () => {
    const index = this.stores.playList.indexOf(this.stores.currentSong);
    if (index > -1) {
      this.scrollY.scrollToElement(
        this.listContent.nativeElement.getElementsByClassName('item')[index],
        0
      );
    }
  }
  playSong = (music: Music) => {
    this.playList.play(music)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
  changePlayMode = () => {
    this.playMode.next();
  }
  toggleFavorite = (e, music: Music) => {
    e.stopPropagation();
    e.preventDefault();
    this.favoriteService.toggleFavorite(music);
  }
  delOne = (e, music: Music) => {
    e.stopPropagation();
    e.preventDefault();
    this.playList.delOne(music)
      .subscribe(res => this.playerEvent.emit('playSong', res));
  }
  delAll = () => {
    this.modalService.confirm({
      content: '确定清空播放列表？'
    }).then(() => {
      this.playList.delAll();
      this.playerEvent.emit('pauseSong');
    });
  }
  stopDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
}
