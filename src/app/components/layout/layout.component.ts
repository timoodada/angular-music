import { Component, OnInit, Type, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input()
  public header: Type<any>;
  @Input()
  public footer: Type<any>;
  @Input()
  public style: any;

  constructor() { }

  ngOnInit() {}

}
