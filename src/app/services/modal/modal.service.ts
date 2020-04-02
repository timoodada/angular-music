import {ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {ModalComponent} from '../../components/modal/modal.component';
import {ToastComponent} from '../../components/toast/toast.component';

interface ModalAction {
  text: string;
  callback: () => void;
}
interface ModalOptions {
  title: TemplateRef<any> | string;
  content: Type<any> | TemplateRef<any> | string;
  actions: ModalAction[];
}
interface ConfirmOption {
  title?: TemplateRef<any> | string;
  content: Type<any> | TemplateRef<any> | string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private createView = (data: ModalOptions): [ComponentRef<ModalComponent>, HTMLElement] => {
    const container = document.createElement('div');
    container.className = 'modal-container';
    document.body.append(container);
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(ModalComponent)
      .create(this.injector, [], container);
    componentRef.instance.title = data.title;
    componentRef.instance.content = data.content;
    componentRef.instance.footer = data.actions;
    this.applicationRef.attachView(componentRef.hostView);
    setTimeout(() => componentRef.instance.show = true, 20);
    return [componentRef, container];
  }
  private createToastView = (title: string): [ComponentRef<ToastComponent>, HTMLElement] => {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.append(container);
    const componentRef = this.componentFactoryResolver.resolveComponentFactory(ToastComponent)
      .create(this.injector, [], container);
    componentRef.instance.title = title;
    this.applicationRef.attachView(componentRef.hostView);
    setTimeout(() => componentRef.instance.show = true, 20);
    return [componentRef, container];
  }
  private destroyView = (params: [ComponentRef<ModalComponent | ToastComponent>, HTMLElement]) => {
    const [componentRef, container] = params;
    componentRef.instance.show = false;
    setTimeout(() => {
      componentRef.destroy();
      container.remove();
    }, 500);
  }
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  alert = ({title = '提示', content}) => {
    return new Promise((resolve, reject) => {
      const modal = this.createView({
        title,
        content,
        actions: [{
          text: '确认',
          callback: () => {
            this.destroyView(modal);
            resolve();
          }
        }]
      });
    });
  }
  confirm = (option: ConfirmOption) => {
    if (!option.title) { option.title = '提示'; }
    return new Promise((resolve, reject) => {
      const componentRef = this.createView({
        title: option.title,
        content: option.content,
        actions: [{
          text: '取消',
          callback: () => {
            this.destroyView(componentRef);
            reject(new Error('closed'));
          }
        }, {
          text: '确认',
          callback: () => {
            this.destroyView(componentRef);
            resolve();
          }
        }]
      });
    });
  }
  toast = (title: string, interval = 2000) => {
    const toast = this.createToastView(title);
    setTimeout(() => {
      this.destroyView(toast);
    }, interval);
  }
}
