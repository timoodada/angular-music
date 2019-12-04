import {Component, OnInit, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input()
  public header?: TemplateRef<any>;
  @Input()
  public footer?: TemplateRef<any>;
  @Input()
  public style: any;

  constructor() { }

  ngOnInit() {}

}
