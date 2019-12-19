import {Component, OnInit, OnDestroy, ViewChild, Input} from '@angular/core';
import BScroll from 'better-scroll';
import {BubbleComponent} from './bubble/bubble.component';

@Component({
  selector: 'app-scroll-y',
  templateUrl: './scroll-y.component.html',
  styleUrls: ['./scroll-y.component.scss'],
  exportAs: 'scrollY'
})
export class ScrollYComponent implements OnInit, OnDestroy {

  constructor() {}
  private wrapper: any;
  @ViewChild('wrapperDom', {static: true})
  public wrapperDom: any;
  @ViewChild(BubbleComponent, {static: false})
  private bubble: any;
  /*
  * 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
  * 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
  * 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
  */
  @Input()
  public probeType: 1 | 2 | 3 = 1;
  @Input()
  public pullUpLoad: any = { threshold: 50 };
  @Input()
  public onPullingUp: (val?: any) => void;
  @Input()
  public onScroll: (val?: any) => void;
  @Input()
  private data: any;
  @Input()
  private onPullingDown: any = null;

  private pullDownRefresh = { threshold: 60, stop: 30 };
  public bubbleWrapperStyle = {};
  public bubbleY = 0;
  public showBubble: boolean | null = true;
  public isPullingDown = false;
  public pullingDownSuccess = false;
  private pullingDownSuccessTime = 1000;
  private isPullingUp = false;
  private fixBubble = (top: number) => {
    if (top > 0 && this.showBubble === null) { this.showBubble = true; }
    if (!this.bubble) { return; }
    const bubbleHeight = this.bubble.headRadius / this.bubble.ratio * 2.5;
    this.bubbleY = Math.max(0, top - bubbleHeight);
    this.bubbleWrapperStyle = {
      top: `${Math.min(top - bubbleHeight, 0) - 5}px`
    };
  }

  refresh = () => {
    if (this.wrapper) { this.wrapper.refresh(); }
  }
  scrollToElement = (el: any, time: number, offsetX?: number | boolean, offsetY?: number | boolean, easing?: any) => {
    if (this.wrapper) { this.wrapper.scrollToElement(el, time, offsetX, offsetY, easing); }
  }
  scrollTo = (x: number, y: number, time: number, easing?: any) => {
    if (this.wrapper) { this.wrapper.scrollTo(x, y, time, easing); }
  }
  finishPullDown = (...args: any[]) => {
    if (this.wrapper) {
      this.pullingDownSuccess = true;
      this.isPullingDown = false;
      setTimeout(() => {
        this.wrapper.finishPullDown(...args);
        this.pullingDownSuccess = false;
        setTimeout(() => this.showBubble = null, 500);
      }, this.pullingDownSuccessTime);
    }
  }
  openPullDown = () => {
    if (this.wrapper) { this.wrapper.openPullDown(this.pullDownRefresh); }
  }
  closePullDown = () => {
    if (this.wrapper) { this.wrapper.closePullDown(); }
  }
  finishPullUp = () => {
    if (this.wrapper) {
      this.isPullingUp = false;
      this.wrapper.finishPullUp();
    }
    setTimeout(this.refresh, 20);
  }
  openPullUp = (config?: any) => {
    if (this.wrapper) { this.wrapper.openPullUp(config || this.pullUpLoad); }
  }
  closePullUp = () => {
    if (this.wrapper) { this.wrapper.closePullUp(); }
  }
  destroy = () => {
    if (this.wrapper) { this.wrapper.destroy(); }
  }
  ngOnInit() {
    this.showBubble = !!this.onPullingDown;
    this.initBS();
  }
  initBS = () => {
    const {probeType, pullUpLoad, onScroll, onPullingUp, pullDownRefresh, onPullingDown} = this;
    const wrapper = this.wrapper = new BScroll(this.wrapperDom.nativeElement, {
      scrollY: true,
      click: true,
      probeType,
      pullUpLoad,
      pullDownRefresh: onPullingDown ? pullDownRefresh : false
    });
    wrapper.on('scroll', (e: any) => {
      if (onScroll) { onScroll(e); }
      this.fixBubble(e.y);
    });
    wrapper.on('pullingUp', (e: any) => {
      if (onPullingUp) {
        this.isPullingUp = true;
        onPullingUp(e);
      }
    });
    wrapper.on('pullingDown', (e: any) => {
      this.isPullingDown = true;
      this.showBubble = false;
      if (onPullingDown) { onPullingDown(e); }
    });

  }
  ngOnDestroy() {
    this.destroy();
  }
}
