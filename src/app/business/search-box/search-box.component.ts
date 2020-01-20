import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription, timer} from 'rxjs';
import {debounce, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  @Input()
  public placeholder = '搜索歌曲、歌手';
  @Output()
  public submitted = new EventEmitter<string>();
  @ViewChild('input', {static: true})
  public input: ElementRef;
  public subscription: Subscription;
  public inputVal = '';
  constructor() { }

  setVal = (val: string) => {
    this.input.nativeElement.value = val;
    this.inputVal = val;
    this.submitted.emit(this.inputVal);
  }
  onSubmit = (e) => {
    e.preventDefault();
    e.target.blur();
    this.submitted.emit(this.inputVal);
  }
  clear = () => {
    this.setVal('');
  }
  ngOnInit() {
    this.subscription = fromEvent(this.input.nativeElement, 'input')
      .pipe(
        map((e: any) => e.target.value),
        tap(e => {
          this.inputVal = e;
        }),
        debounce(() => timer(500))
      ).subscribe(val => {
        this.submitted.emit(val);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
