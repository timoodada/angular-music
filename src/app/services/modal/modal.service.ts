import { Injectable } from '@angular/core';
import {ModalComponent} from '../../components/modal/modal.component';
import {ToastComponent} from '../../components/toast/toast.component';

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
  private toastEl: ToastComponent;
  private toastTimer: any;
  constructor() {}
  init(el: ModalComponent | ToastComponent) {
    if (el instanceof  ModalComponent) {
      this.el = el;
    } else {
      this.toastEl = el;
    }
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
    return new Promise((resolve, reject) => {
      this.show({
        title,
        content,
        actions: [{
          text: '确认',
          callback: () => {
            this.close();
            resolve();
          }
        }]
      });
    });
  }
  confirm = ({title = '提示', content}) => {
    return new Promise((resolve, reject) => {
      this.show({
        title,
        content,
        actions: [{
          text: '取消',
          callback: () => {
            this.close();
            reject(new Error('closed'));
          }
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
  toast = (title: string, interval = 1000) => {
    clearTimeout(this.toastTimer);
    this.toastEl.show = false;
    this.toastTimer = setTimeout(() => {
      this.toastEl.title = title;
      this.toastEl.show = true;
      this.toastTimer = setTimeout(() => {
        this.toastEl.show = false;
      }, interval);
    }, 20);
  }
}
