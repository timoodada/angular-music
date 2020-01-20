import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, NgZone} from '@angular/core';
import BScroll from 'better-scroll';
import {BubbleComponent} from './bubble/bubble.component';
import {fadeAnimation} from './fade.animate';

@Component({
  selector: 'app-scroll-y',
  templateUrl: './scroll-y.component.html',
  styleUrls: ['./scroll-y.component.scss'],
  exportAs: 'scrollY',
  animations: [
    fadeAnimation
  ]
})
export class ScrollYComponent implements OnInit, OnDestroy {
  private wrapper: any;
  @ViewChild('wrapperDom', {static: true})
  public wrapperDom: ElementRef;
  @ViewChild(BubbleComponent, {static: false})
  private bubble: BubbleComponent;
  /*
  * @Params probeType
  * When set to 1, The scroll event is non-real time fired (after the screen scrolled for some time)
  * When set to 2, the scroll event is real-time fired during the screen scrolling
  * When set to 3, the scroll event is real-time fired during not only the screen scrolling but also the momentum and bounce animation
  * If not set, the default value 0 means there is no scroll event is fired.
  */
  @Input()
  public probeType: 1 | 2 | 3 = 1;
  @Input()
  public pullUpLoad: any = { threshold: 50 };
  @Input()
  public pullingUpEnable = false;
  @Input()
  private data: any;
  @Input()
  private pullingDownEnable = false;
  @Output()
  public scrolling = new EventEmitter<any>();
  @Output()
  public pullingDown = new EventEmitter<any>();
  @Output()
  public pullingUp = new EventEmitter<any>();

  private pullDownRefresh = { threshold: 60, stop: 30 };
  public bubbleWrapperStyle = {};
  public bubbleY = 0;
  public showBubble: boolean | null = null;
  public isPullingDown = false;
  public pullingDownSuccess = false;
  private pullingDownSuccessTime = 1000;
  private pullingDownStartTime = Date.now();
  public isPullingUp = false;
  private fixBubble = (top: number) => {
    if (top > 0 && this.showBubble === null) {
      this.showBubble = true;
    }
    if (top <= 0) { this.showBubble = null; }
    if (!this.bubble) { return; }
    const bubbleHeight = this.bubble.headRadius / this.bubble.ratio * 2.5;
    this.bubbleY = Math.max(0, top - bubbleHeight);
    this.bubbleWrapperStyle = {
      top: `${Math.min(top - bubbleHeight, 0) - 5}px`
    };
  }

  constructor(
    private zone: NgZone
  ) {}

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
      const freeTime = Math.max(500 - (Date.now() - this.pullingDownStartTime), 0);
      setTimeout(() => {
        this.pullingDownSuccess = true;
        this.isPullingDown = false;
        setTimeout(() => {
          this.wrapper.finishPullDown(...args);
          this.pullingDownSuccess = false;
          setTimeout(() => this.showBubble = null, 500);
        }, this.pullingDownSuccessTime);
      }, freeTime);
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
    this.initBS();
  }
  initBS = () => {
    const {probeType, pullUpLoad, pullingUpEnable, pullDownRefresh, pullingDownEnable} = this;
    this.zone.runOutsideAngular(() => {
      const wrapper = this.wrapper = new BScroll(this.wrapperDom.nativeElement, {
        scrollY: true,
        click: true,
        probeType,
        pullUpLoad,
        pullDownRefresh: pullingDownEnable ? pullDownRefresh : false
      });
      wrapper.on('scroll', (e: any) => {
        this.zone.run(() => {
          this.scrolling.emit(e);
          if (pullingDownEnable) {
            this.fixBubble(e.y);
          }
        });
      });
      wrapper.on('pullingUp', (e: any) => {
        this.zone.run(() => {
          if (pullingUpEnable) {
            this.isPullingUp = true;
            this.pullingUp.emit(e);
          }
        });
      });
      wrapper.on('pullingDown', (e: any) => {
        this.zone.run(() => {
          this.isPullingDown = true;
          this.showBubble = false;
          this.pullingDownStartTime = Date.now();
          if (pullingDownEnable) {
            this.pullingDown.emit(e);
          }
        });
      });
    });
  }
  ngOnDestroy() {
    this.destroy();
  }
}
