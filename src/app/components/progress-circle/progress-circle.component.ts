import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent implements OnInit {
  public dashArray = Math.PI * 100;
  public dashOffset = Math.PI * 100;
  @Input()
  public set percent(num: number) {
    this.dashOffset = (1 - num) * this.dashArray;
  }
  @Input()
  public radius = 50;

  constructor() {}

  ngOnInit() {}

}
