import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent implements OnInit {
  public ratio = window.devicePixelRatio;
  public width = 50;
  public height = 80;
  public initRadius = 0;
  public minHeadRadius = 0;
  public minTailRadius = 0;
  public initArrowRadius = 0;
  public minArrowRadius = 0;
  public arrowWidth = 0;
  public maxDistance = 0;
  public initCenterX = 0;
  public initCenterY = 0;
  public headCenter = { x: 0, y: 0 };
  public headRadius = 0;
  public style = {};
  public get distance() {
    return Math.max(0, Math.min(this.y * this.ratio, this.maxDistance));
  }

  private _y = 0;
  @Input()
  public get y() {
    return this._y;
  }
  public set y(val: number) {
    val = Math.max(0, val);
    if (this._y !== val) {
      this._y = val;
      this.draw();
    }
  }
  @ViewChild('canvasEle', {static: true})
  private canvasEle: any;
  private draw = () => {
    const bubble = this.canvasEle.nativeElement;
    const ctx = bubble.getContext('2d');
    ctx.clearRect(0, 0, bubble.width, bubble.height);
    this.drawBubble(ctx);
    this.drawArrow(ctx);
  }
  private drawBubble = (ctx) => {
    ctx.save();
    ctx.beginPath();
    const rate = this.distance / this.maxDistance;
    const headRadius = this.headRadius = this.initRadius - (this.initRadius - this.minHeadRadius) * rate;
    this.headCenter.y = this.initCenterY - (this.initRadius - this.minHeadRadius) * rate;
    // draw the upper half of the arc
    ctx.arc(this.headCenter.x, this.headCenter.y, headRadius, 0, Math.PI, true);
    // draw bezier curve on the left
    const tailRadius = this.initRadius - (this.initRadius - this.minTailRadius) * rate;
    const tailCenter = {
      x: this.headCenter.x,
      y: this.headCenter.y + this.distance
    };
    const tailPointL = {
      x: tailCenter.x - tailRadius,
      y: tailCenter.y
    };
    const controlPointL = {
      x: tailPointL.x,
      y: tailPointL.y - this.distance / 2
    };
    ctx.quadraticCurveTo(controlPointL.x, controlPointL.y, tailPointL.x, tailPointL.y);
    // draw the bottom half of the arc
    ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true);
    // draw bezier curve on the right
    const headPointR = {
      x: this.headCenter.x + headRadius,
      y: this.headCenter.y
    };
    const controlPointR = {
      x: tailCenter.x + tailRadius,
      y: headPointR.y + this.distance / 2
    };
    ctx.quadraticCurveTo(controlPointR.x, controlPointR.y, headPointR.x, headPointR.y);
    ctx.fillStyle = 'rgb(170,170,170)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(153,153,153)';
    ctx.stroke();
    ctx.restore();
  }
  private drawArrow = (ctx) => {
    ctx.save();
    ctx.beginPath();
    const rate = this.distance / this.maxDistance;
    const arrowRadius = this.initArrowRadius - (this.initArrowRadius - this.minArrowRadius) * rate;
    // draw inner circle
    ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius - (this.arrowWidth - rate), -Math.PI / 2, 0, true);
    // draw outer circle
    ctx.arc(this.headCenter.x, this.headCenter.y, arrowRadius, 0, Math.PI * 3 / 2, false);
    ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius - this.arrowWidth / 2 + rate);
    ctx.lineTo(this.headCenter.x + this.arrowWidth * 2 - rate * 2, this.headCenter.y - arrowRadius + this.arrowWidth / 2);
    ctx.lineTo(this.headCenter.x, this.headCenter.y - arrowRadius + this.arrowWidth * 3 / 2 - rate);
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fill();
    ctx.strokeStyle = 'rgb(170,170,170)';
    ctx.stroke();
    ctx.restore();
  }

  constructor() {
    this.width *= this.ratio;
    this.height *= this.ratio;
    this.initRadius = 16 * this.ratio;
    this.minHeadRadius = 12 * this.ratio;
    this.minTailRadius = 5 * this.ratio;
    this.initArrowRadius = 10 * this.ratio;
    this.minArrowRadius = 6 * this.ratio;
    this.arrowWidth = 3 * this.ratio;
    this.maxDistance = 40 * this.ratio;
    this.initCenterX = 25 * this.ratio;
    this.initCenterY = 25 * this.ratio;
    this.headCenter = {
      x: this.initCenterX,
      y: this.initCenterY
    };
    this.style = {
      width: this.width / this.ratio + 'px',
      height: this.height / this.ratio + 'px'
    };
  }

  ngOnInit() {
    setTimeout(this.draw, 20);
  }
}
