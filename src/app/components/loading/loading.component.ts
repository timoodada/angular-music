import {Component, Input, OnInit} from '@angular/core';
import loading from './loading.gif';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input()
  public title = '';
  public loading = loading;
  constructor() {}

  ngOnInit() {}

}
