import {Component, OnInit} from '@angular/core';
import {HttpService} from './services/http/http.service';
import {Router, RouteConfigLoadEnd, RouteConfigLoadStart} from '@angular/router';
import './stores/index';
import {FavoriteService} from './stores/actions/favorite/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading: boolean;

  constructor(
    private http: HttpService,
    private router: Router,
    private favorite: FavoriteService
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
  }
}
