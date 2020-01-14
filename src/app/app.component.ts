import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from './services/http/http.service';
import {Router, RouteConfigLoadEnd, RouteConfigLoadStart} from '@angular/router';
import './stores/index';
import {FavoriteService} from './stores/actions/favorite/favorite.service';
import {RecentService} from './stores/actions/recent/recent.service';
import {ModalService} from './services/modal/modal.service';
import {ModalComponent} from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading: boolean;
  @ViewChild(ModalComponent, {static: false})
  public set modal(val: ModalComponent) {
    this.modalService.init(val);
  }
  constructor(
    private http: HttpService,
    private router: Router,
    private favorite: FavoriteService,
    private recent: RecentService,
    private modalService: ModalService
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
    this.favorite.init();
    this.recent.init();
  }
}
