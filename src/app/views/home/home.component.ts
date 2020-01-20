import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {RanksService} from '../../stores/actions/ranks/ranks.service';
import {BannersService} from '../../stores/actions/banners/banners.service';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {zip} from 'rxjs';
import {StoresService} from '../../stores/stores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StoresService]
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(ScrollYComponent, {static: true})
  public scrollY: ScrollYComponent;

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
      this.scrollY.finishPullDown();
    });
  }
  ngOnInit() {
    this.ranksService.fetchRanks().subscribe();
    this.bannersService.fetchBanners().subscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }
  ngOnDestroy(): void {
    // console.log('component destroyed');
  }
}
