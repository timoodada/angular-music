import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input()
  public style: any;

  constructor() { }

  ngOnInit() {}

}
