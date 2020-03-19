import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {List} from 'immutable';

@Component({
  selector: 'app-cover-list',
  templateUrl: './cover-list.component.html',
  styleUrls: ['./cover-list.component.scss']
})
export class CoverListComponent implements OnInit {
  @Input()
  public list: any[] | List<any> = [];
  @Input()
  public loading = false;
  @Input()
  public img: TemplateRef<any>;
  @Input()
  public song: TemplateRef<any>;
  @Output()
  public clicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
