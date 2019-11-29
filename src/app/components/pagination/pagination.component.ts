import { Component, OnInit, Input, Type } from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

interface Pager {
  currentPage: number;
  total: number;
  size: number;
  [prop: string]: any;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()
  main: Type<any>;

  _pager: Pager;
  @Input()
  get pager(): Pager {
    return this._pager;
  }
  set pager(val: Pager) {
    this.page = val ? val.currentPage : 0;
    this.size = val ? val.size : 0;
    this.sunscribe();
    this._pager = val;
  }

  @Input()
  onChange: (page: number, size: number) => any;

  get prePagerStatus() {
    return this.pager && this.pager.currentPage > 1;
  }
  get nextPagerStatus() {
    return this.pager && Math.ceil(this.pager.total / this.pager.size) > this.page;
  }
  get totalPage() {
    return this.pager ? this.pager.total : 0;
  }
  get btnList(): any[] {
    const length = 7;
    const arr = [];
    while (arr.length < length || this.totalPage <= length) {
      if (arr.length === 0) {
        arr.push(this.page);
      }
      if (arr[0] > 1) {
        arr.unshift(arr[0] - 1);
      }
      if (arr[arr.length - 1] < this.totalPage) {
        arr.push(arr[arr.length - 1] + 1);
      }
    }
    if (arr.length > 1) {
      if (arr[0] > 1) {
        arr.splice(0, 1, 1, '<');
      }
      if (arr[arr.length - 1] < this.totalPage) {
        arr.splice(arr.length - 1, 1, '>', this.totalPage);
      }
    }
    return arr;
  }

  onClick: (type: string, e: any) => void;
  public page: number;
  public size: number;

  constructor() {}

  private observable: Observable<any>;
  registerEvent = () => {
    this.observable = new Observable((observer: any) => {
      this.onClick = (type, e) => {
        if (type === 'prev' && this.prePagerStatus) {
          this.page--;
        } else if (type === 'next' && this.nextPagerStatus) {
          this.page++;
        } else if (typeof type === 'number') {
          this.page = type;
        } else if (type === '<') {
          this.page = Math.max(1, this.page - 5);
        } else if (type === '>') {
          this.page = Math.min(this.totalPage, this.page + 5);
        } else {
          return;
        }
        observer.next(e);
      };
      return {
        unsubscribe: () => {
          this.onClick = () => {};
        }
      };
    })
    .pipe(
      take(1)
    );
  }

  ngOnInit() {
    this.registerEvent();
    this.sunscribe();
  }

  sunscribe = () => {
    if (!this.observable) { return; }
    this.observable.subscribe(() => {
      this.onChange(this.page, this.size);
    });
  }

}
