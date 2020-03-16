import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouteConfigLoadEnd, RouteConfigLoadStart} from '@angular/router';
import './stores/index';
import {ModalService} from './services/modal/modal.service';
import {ModalComponent} from './components/modal/modal.component';
import {ToastComponent} from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Angular Music';
  public loading: boolean;
  @ViewChild(ModalComponent, {static: false})
  public set modal(val: ModalComponent) {
    this.modalService.init(val);
  }
  @ViewChild(ToastComponent, {static: false})
  public set toast(val: ToastComponent) {
    this.modalService.init(val);
  }
  constructor(
    private router: Router,
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

  ngOnInit() {}
}
