import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage = localStorage;
  private sessionStorage = sessionStorage;
  constructor() { }
  get = (name: string): any[] | object => {
    return JSON.parse(this.localStorage.getItem(name) || this.sessionStorage.getItem(name));
  }
  set = (name: string, value: any[] | object, extraordinary?: boolean) => {
    if (extraordinary) {
      this.sessionStorage.setItem(name, JSON.stringify(value));
    } else {
      this.localStorage.setItem(name, JSON.stringify(value));
    }
  }
  remove = (name: string) => {
    this.sessionStorage.removeItem(name);
    this.localStorage.removeItem(name);
  }
}
