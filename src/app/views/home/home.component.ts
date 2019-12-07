import {Component, OnInit, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {State} from '../../stores/core';
import {RanksService} from '../../stores/actions/ranks.service';
import {BannersService} from '../../stores/actions/banners.service';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {List} from 'immutable';
import {zip} from 'rxjs';
import {lazyload} from '../../helpers/lazy';

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

  onPullingDown = () => {
    zip(
      this.ranksService.updateRanks(),
      this.bannersService.updateBanners()
    ).subscribe(() => {
      this.updateLazy();
      this.scrollY.finishPullDown();
    });
  }
  ngOnInit() {
    this.ranksService.fetchRanks().subscribe(this.updateLazy);
    this.bannersService.fetchBanners().subscribe();
  }
  updateLazy = () => {
    setTimeout(() => lazyload.update(), 20);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
}
