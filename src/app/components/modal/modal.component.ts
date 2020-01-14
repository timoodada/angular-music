import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {modalAnimation} from './animate';

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
  @Input()
  public header: TemplateRef<any>;
  @Input()
  public title: string;
  @Input()
  public content: string;
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
