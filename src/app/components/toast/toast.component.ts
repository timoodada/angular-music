import {Component, Input, OnInit} from '@angular/core';
import {toastAnimation} from './toast.animate';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    toastAnimation
  ]
})
export class ToastComponent implements OnInit {

  @Input()
  public show = false;
  @Input()
  public title: string;
  constructor() { }

  ngOnInit() {}

}
