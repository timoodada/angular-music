import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StoresService} from '../../stores/stores.service';
import {HistoryService} from '../../stores/actions/history/history.service';
import {delAnimation} from './del.animate';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss'],
  animations: [
    delAnimation
  ]
})
export class SearchHistoryComponent implements OnInit {
  @Output()
  public submitted = new EventEmitter<string>();

  constructor(
    public stores: StoresService,
    private historyService: HistoryService
  ) {}

  ngOnInit() {}

  onDel = (item: string, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.historyService.del(item);
  }
  onClick = (item: string, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.submitted.emit(item);
  }
}
