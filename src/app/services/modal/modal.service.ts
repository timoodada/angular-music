import { Injectable } from '@angular/core';
import {ModalComponent} from '../../components/modal/modal.component';

interface ModalAction {
  text: string;
  callback: () => void;
}
interface ModalOptions {
  title: string;
  content: string;
  actions: ModalAction[];
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private el: ModalComponent;
  constructor() {}
  init(el: ModalComponent) {
    this.el = el;
  }
  close = () => {
    this.el.show = false;
  }
  show = (data: ModalOptions) => {
    this.el.title = data.title;
    this.el.content = data.content;
    this.el.footer = data.actions;
    setTimeout(() => this.el.show = true, 20);
  }
  alert = ({title = '提示', content}) => {
    this.show({
      title,
      content,
      actions: [{
        text: '确认',
        callback: this.close
      }]
    });
  }
  confirm = ({title = '提示', content}) => {
    return new Promise((resolve, reject) => {
      this.show({
        title,
        content,
        actions: [{
          text: '取消',
          callback: this.close
        }, {
          text: '确认',
          callback: () => {
            this.close();
            resolve();
          }
        }]
      });
    });
  }
}
