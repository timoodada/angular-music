import {Component, Input, OnInit, ViewChild, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import BScroll from 'better-scroll';
import {addClass, debounce} from '../../helpers/util';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  exportAs: 'slider'
})
export class SliderComponent implements OnInit, OnDestroy, OnChanges {
  private wrapper: any;
  private timer: any = null;
  @Input()
  public threshold = 0.3;
  @Input()
  public speed = 400;
  @Input()
  public loop = true;
  @Input()
  public click = true;
  @Input()
  public interval = 4000;
  @Input()
  public autoplay = false;
  @Input()
  public data: any;
  @Input()
  public dot = true;

  @ViewChild('wrapperDom', {static: true})
  public wrapperDom: any;

  @ViewChild('sliderGroup', {static: true})
  public sliderGroup: any;

  public currentIndex = 0;
  public totalSize = 0;

  private onWindowResize = debounce(() => {
    if (!this.wrapper || !this.wrapper.enabled) {
      return;
    }
    if (this.wrapper.isInTransition) {
      this.onScrollEnd();
    }
    this.refresh();
  }, 500);

  constructor() {}

  private setSlideWidth = (isResize?: boolean) => {
    const children = this.sliderGroup.nativeElement.children;
    this.totalSize = children.length;
    let width = 0;
    const slideWidth = this.wrapperDom.nativeElement.clientWidth;
    for (const v of children) {
      addClass(v, 'slider-item');
      v.style.width = slideWidth + 'px';
      v.style.float = 'left';
      width += slideWidth;
    }
    if (this.loop && !isResize) {
      width += 2 * slideWidth;
    }
    this.sliderGroup.nativeElement.style.width = width + 'px';
  }
  private play = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.next();
    }, this.interval);
  }
  private onScrollEnd = () => {
    this.currentIndex = this.wrapper.getCurrentPage().pageX;
    if (this.autoplay) {
      this.play();
    }
  }
  initBS = () => {
    const wrapper = this.wrapper = new BScroll(this.wrapperDom.nativeElement, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: this.loop,
        threshold: this.threshold,
        speed: this.speed
      },
      bounce: false,
      stopPropagation: true,
      click: this.click,
      observeDOM: false
    });
    wrapper.on('scrollEnd', this.onScrollEnd);
    wrapper.on('touchEnd', () => {
      if (this.autoplay) {
        this.play();
      }
    });
    wrapper.on('beforeScrollStart', () => {
      clearTimeout(this.timer);
    });
  }
  init = () => {
    clearTimeout(this.timer);
    this.currentIndex = 0;
    this.setSlideWidth();
    this.initBS();
    if (this.autoplay) {
      this.play();
    }
    window.addEventListener('resize', this.onWindowResize);
  }
  pre = () => {
    if (this.wrapper) {
      this.wrapper.pre();
    }
  }
  next = () => {
    if (this.wrapper) {
      this.wrapper.next();
    }
  }
  destroy = () => {
    clearTimeout(this.timer);
    if (this.wrapper) {
      this.wrapper.destroy();
    }
    window.removeEventListener('resize', this.onWindowResize);
  }
  refresh = () => {
    this.setSlideWidth(true);
    if (this.wrapper) {
      this.wrapper.refresh();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.destroy();
    setTimeout(this.init, 20);
  }
  ngOnInit() {
    this.init();
  }
  ngOnDestroy(): void {
    this.destroy();
  }
}
