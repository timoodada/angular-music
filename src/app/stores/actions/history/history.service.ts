import { Injectable } from '@angular/core';
import store, {getState} from '../../';
import {StorageService} from '../../../services/storage/storage.service';
import {List} from 'immutable';

const MAX_NUM = 10;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private STORAGE_KEY = '__SEARCH_HISTORY__';
  private setHistory = (list: string[] | List<string>) => {
    this.storage.set(this.STORAGE_KEY, list);
    store.dispatch({
      type: 'SET_HISTORY',
      value: list
    });
  }
  constructor(
    private storage: StorageService
  ) {
    this.init();
  }
  init = () => {
    this.setHistory(
      this.storage.get(this.STORAGE_KEY) as string[]
    );
  }
  add = (str: string) => {
    if (str) {
      let history = getState('history') as List<string>;
      const index = history.indexOf(str);
      if (index > -1) {
        history = history.slice(index, 1);
      }
      history = history.unshift(str);
      if (history.size > MAX_NUM) {
        history = history.splice(history.size, history.size - MAX_NUM);
      }
      this.setHistory(history);
    }
  }
  del = (str: string) => {
    let history = getState('history') as List<string>;
    const index = history.indexOf(str);
    if (index > -1) {
      history = history.splice(index, 1);
      this.setHistory(history);
    }
  }
}
