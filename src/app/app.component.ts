import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouteConfigLoadEnd, RouteConfigLoadStart} from '@angular/router';
import './stores/index';
import {ModalService} from './services/modal/modal.service';
import {StoresService} from './stores/stores.service';
import {FavoriteService} from './stores/actions/favorite/favorite.service';
import {UserInfoService} from './stores/actions/user-info/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    StoresService
  ]
})
export class AppComponent implements OnInit {
  public title = 'Angular Music';
  public loading: boolean;
  constructor(
    private router: Router,
    private stores: StoresService,
    private favorite: FavoriteService,
    private userInfo: UserInfoService
  ) {
    router.events.subscribe(e => {
      if (e instanceof RouteConfigLoadStart) {
        this.loading = true;
      }
      if (e instanceof RouteConfigLoadEnd) {
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    this.userInfo.init();
  }
}
