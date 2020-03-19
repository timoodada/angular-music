import {Component, Input, OnInit, TemplateRef, Type} from '@angular/core';
import {modalAnimation} from './modal.animate';

interface Footer {
  text: string;
  callback?: (val?: any) => void;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    modalAnimation
  ]
})
export class ModalComponent implements OnInit {
  private _title: string | TemplateRef<any>;
  public titleType: 'string' | 'template' = 'string';
  @Input()
  set title(val: string | TemplateRef<any>) {
    if (typeof val === 'string') {
      this.titleType = 'string';
    } else if (val instanceof TemplateRef) {
      this.titleType = 'template';
    }
    this._title = val;
  }
  get title() {
    return this._title;
  }
  private _content: string | TemplateRef<any> | Type<any>;
  public contentType: 'string' | 'template' | 'component' = 'string';
  @Input()
  public set content(val: string | TemplateRef<any> | Type<any>) {
    if (typeof val === 'string') {
      this.contentType = 'string';
    } else if (val instanceof TemplateRef) {
      this.contentType = 'template';
    } else if (val instanceof Type) {
      this.contentType = 'component';
    }
    this._content = val;
  }
  public get content() {
    return this._content;
  }
  @Input()
  public footer: Footer[] = [];
  public show = false;
  constructor() { }

  ngOnInit() {}
  onClick = (val: Footer) => {
    if (val.callback) {
      val.callback();
    }
  }
}
