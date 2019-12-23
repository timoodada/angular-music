import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {prefixStyle} from '../../helpers/util';

const transform = prefixStyle('transform');
const BTN_WIDTH = 16;

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  private _percent = 0;
  @Input()
  public onChange: (percent: number) => void;
  @Input()
  public get percent() {
    return this._percent;
  }
  public set percent(num: number) {
    this._percent = num;
    setTimeout(this._initPosition, 20);
  }
  @ViewChild('progressBtn', {static: true})
  public progressBtn: any;
  @ViewChild('progressBar', {static: true})
  public progressBar: any;
  @ViewChild('progress', {static: true})
  public progress: any;
  public touch = {
    status: null,
    isMove: null
  };
  public offset = 0;

  constructor() {}

  handleBtnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }
  touchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.touch.status = true;
  }
  touchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.touch.status) { return; }
    this.touch.isMove = true;
    const barWidth = this.progressBar.nativeElement.clientWidth;
    this.progressBarChange(e.touches[0].pageX - (window.innerWidth - barWidth) / 2);
  }
  touchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.touch.isMove) { return; }
    const barWidth = this.progressBar.nativeElement.clientWidth;
    this.touch.status = false;
    this.touch.isMove = false;
    if (typeof this.onChange === 'function') {
      this.onChange(this.offset / barWidth);
    }
  }
  progressBarChange = (offset) => {
    const barWidth = this.progressBar.nativeElement.clientWidth;
    offset -= BTN_WIDTH / 2;
    const _offset = Math.min(barWidth - BTN_WIDTH / 2, Math.max(offset, 0));
    this.offset = _offset + BTN_WIDTH / 2;
    this.progress.nativeElement.style.width = `${_offset}px`;
    this.progressBtn.nativeElement.style[transform] = `translate3d(${_offset}px, 0, 0)`;
  }
  _initPosition = () => {
    const percent = this.percent;
    if (!this.touch.status) {
      const barWidth = this.progressBar.nativeElement.clientWidth;
      const paddingLeft = barWidth * percent;
      this.progressBarChange(paddingLeft);
    }
  }

  ngOnInit() {
    const progressBtn: HTMLElement = this.progressBtn.nativeElement;
    progressBtn.ontouchstart = this.touchStart;
    progressBtn.ontouchmove = this.touchMove;
    progressBtn.ontouchend = this.touchEnd;
  }

}
