import {Component, OnInit, ViewChild} from '@angular/core';
import {StoresService} from '../../stores/stores.service';
import {HotWordsService} from '../../stores/actions/hot-words/hot-words.service';
import {PlayListService} from '../../stores/actions/play-list/play-list.service';
import {Music} from '../../business/player';
import {PlayerEventService} from '../../business/player/player-event.service';
import {SearchBoxComponent} from '../../business/search-box/search-box.component';
import {ModalService} from '../../services/modal/modal.service';
import {HistoryService} from '../../stores/actions/history/history.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [StoresService]
})
export class SearchComponent implements OnInit {

  @ViewChild('searchBox', {static: false})
  private searchBox: SearchBoxComponent;
  public keywords = '';
  constructor(
    private hotWordsService: HotWordsService,
    private playListService: PlayListService,
    private playerEventService: PlayerEventService,
    private modalService: ModalService,
    private historyService: HistoryService,
    public stores: StoresService
  ) {}

  onSearch = (keywords) => {
    this.keywords = keywords;
  }
  onBack = (keywords) => {
    this.searchBox.setVal(keywords);
  }
  onPlay = (val: Music) => {
    this.playListService.insertNext(val);
    this.playListService.play(val).subscribe(res => {
      this.playerEventService.emit('playSong', res);
    });
  }
  clear = () => {
    this.modalService.confirm({content: '确定清空搜索历史？'}).then(() => {
      this.historyService.clear();
    }).catch(() => {
      // cancel
    });
  }
  ngOnInit() {
    this.hotWordsService.fetchHotWords().subscribe();
  }
}
