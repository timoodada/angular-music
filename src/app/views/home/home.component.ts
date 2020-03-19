import {Component, OnInit, ViewChild} from '@angular/core';
import {RanksService} from '../../stores/actions/ranks/ranks.service';
import {BannersService} from '../../stores/actions/banners/banners.service';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';
import {zip} from 'rxjs';
import {StoresService} from '../../stores/stores.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [StoresService]
})
export class HomeComponent implements OnInit {
  @ViewChild(ScrollYComponent, {static: true})
  public scrollY: ScrollYComponent;
  public loading = false;

  constructor(
    private router: Router,
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
    this.loading = true;
    this.ranksService.fetchRanks().subscribe(() => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
    this.bannersService.fetchBanners().subscribe();
  }
  goDetail = (item) => {
    this.router.navigate([`/home/${item.id}`]);
  }

}
