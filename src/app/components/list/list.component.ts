import { Component, OnInit, Input, Type, ViewChild } from '@angular/core';
import {Observable} from 'rxjs';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  exportAs: 'list'
})
export class ListComponent implements OnInit {
  @Input()
  onChange: any;
  @Input()
  pager: any;

  private subscriber: any;
  private _data: Observable<any[]> | any;
  @Input()
  public get data(): Observable<any[]> | any {
    return this._data;
  }
  public set data(data: Observable<any[]> | any) {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (data) {
      this.loading = true;
      this._data = data;
      this.subscriber = this._data.subscribe({
        next: (res: any[]) => {
          this.list = res;
        },
        error: (err: Error) => {
          console.error(err);
          this.loading = false;
          if (this.pagination) {
            this.pagination.sunscribe();
          }
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  @Input()
  public main: Type<any>;

  @ViewChild(PaginationComponent, {static: false})
  public pagination: any;

  public list: any[] = [];
  public loading = true;

  constructor() {}

  ngOnInit() {}

}
