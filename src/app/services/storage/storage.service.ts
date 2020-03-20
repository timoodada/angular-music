import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage = localStorage;
  private sessionStorage = sessionStorage;
  constructor() { }
  get = (name: string): any[] | object | string => {
    let ret = this.localStorage.getItem(name) || this.sessionStorage.getItem(name);
    try {
      ret = JSON.parse(ret);
    } catch (err) {}
    return ret;
  }
  set = (name: string, value: any[] | object | string, extraordinary?: boolean) => {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    if (extraordinary) {
      this.sessionStorage.setItem(name, value);
    } else {
      this.localStorage.setItem(name, value);
    }
  }
  remove = (name: string) => {
    this.sessionStorage.removeItem(name);
    this.localStorage.removeItem(name);
  }
}
