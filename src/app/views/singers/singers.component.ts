import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StoresService} from '../../stores/stores.service';
import {SingersService} from '../../stores/actions/singers/singers.service';
import {prefixStyle} from '../../helpers/util';
import {ScrollYComponent} from '../../components/scroll-y/scroll-y.component';

const ANCHOR_HEIGHT = 16;
const TITLE_HEIGHT = 30;
const transform = prefixStyle('transform');

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.scss'],
  providers: [StoresService]
})
export class SingersComponent implements OnInit {

  public fixedTitle = '热门';
  @ViewChild('scrollY', {static: true})
  public scrollY: ScrollYComponent;
  @ViewChild('listWrapper', {static: true})
  public listWrapper: ElementRef;
  @ViewChild('fixed', {static: true})
  public fixed: ElementRef;
  @ViewChild('listShortcut', {static: false})
  public set listShortcut(e: ElementRef) {
    const el = e.nativeElement;
    el.ontouchstart = this.onShortcutTouchStart;
    el.ontouchmove = this.onShortcutTouchMove;
    el.ontouchend = this.onShortcutTouchEnd;
  }
  public posY = 0;
  public currentIndex = -1;
  public translate = 0;
  public touch: {[prop: string]: number} = {};

  constructor(
    public stores: StoresService,
    public singersService: SingersService
  ) { }

  calculateHeight = () => {
    if (!this.listWrapper) {
      return;
    }
    const list = this.listWrapper.nativeElement.getElementsByClassName('list-group');
    let height = 0;
    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight;
      if (this.posY < height) {
        if (this.currentIndex !== i) {
          this.fixedTitle = this.stores.singers.get(i).title;
        }
        this.currentIndex = i;
        break;
      }
    }
  }
  calculateDiff = () => {
    if (!this.listWrapper || !this.fixed) {
      return;
    }
    const index = this.currentIndex;
    const list = this.listWrapper.nativeElement.getElementsByClassName('list-group');
    let height = 0;
    for (let i = 0; i < index + 1; i++) {
      height += list[i].clientHeight;
    }
    let translate;
    if (this.posY > height - TITLE_HEIGHT && this.posY < height) {
      translate = height - TITLE_HEIGHT - this.posY;
    } else {
      translate = 0;
    }
    if (this.translate === translate) {
      return;
    }
    this.fixed.nativeElement.style[transform] = `translate(0, ${translate}px)`;
    this.translate = translate;
  }

  listenScroll = (pos) => {
    this.posY = Math.abs(pos.y);
    if (pos.y > 0) {
      this.fixed.nativeElement.style.display = 'none';
    } else {
      this.fixed.nativeElement.style.display = 'block';
    }
    this.calculateHeight();
    this.calculateDiff();
  }

  onShortcutTouchMove = (e) => {
    e.stopPropagation();
    if (typeof this.touch.y1 === 'undefined') {
      return;
    }
    this.touch.y2 = e.touches[0].pageY;
    const dis = this.touch.y2 - this.touch.y1;
    const index = Math.floor(dis / ANCHOR_HEIGHT);
    this.scrollTo(this.touch.index + index);
  }
  onShortcutTouchStart = (e) => {
    e.stopPropagation();
    const index = e.target.title;
    if (!index) {
      return;
    }
    this.scrollTo(Number(index));
    this.touch.index = Number(index);
    this.touch.y1 = e.touches[0].pageY;
  }
  onShortcutTouchEnd = (e) => {
    e.stopPropagation();
  }
  scrollTo = (index) => {
    if (index < 0 || index >= this.stores.singers.size || !this.listWrapper || !this.scrollY) {
      return;
    }
    const listDom = this.listWrapper.nativeElement.getElementsByClassName('list-group');
    this.scrollY.scrollToElement(listDom[index], 0);
    this.currentIndex = index;
  }

  ngOnInit() {
    this.singersService.fetchList().subscribe();
  }

}
