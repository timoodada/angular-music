import {Component, OnInit, ViewChild, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {RanksService} from '../../stores/actions/ranks/ranks.service';
import {BannersService} from '../../stores/actions/banners/banners.service';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {zip} from 'rxjs';
import {lazyload} from '../../helpers/lazy';
import {StoresService} from '../../stores/stores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StoresService]
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(ScrollYComponent, {static: true})
  public scrollY: any;

  constructor(
    private ranksService: RanksService,
    private bannersService: BannersService,
    public stores: StoresService
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
  ngOnDestroy(): void {
    // console.log('component destroyed');
  }
}
