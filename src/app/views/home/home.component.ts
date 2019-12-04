import {Component, OnInit, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {State} from '../../stores/core';
import {RanksService} from '../../stores/actions/ranks.service';
import {BannersService} from '../../stores/actions/banners.service';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {List} from 'immutable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  @State('ranks')
  public ranks: List<any>;
  @State('banners')
  public banners: List<any>;
  @ViewChild(ScrollYComponent, {static: true})
  public scrollY: any;

  constructor(
    private ranksService: RanksService,
    private bannersService: BannersService
  ) {}

  ngOnInit() {
    this.ranksService.fetchRanks();
    this.bannersService.fetchBanners();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
