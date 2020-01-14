import { Injectable } from '@angular/core';
import {StorageService} from '../../../services/storage/storage.service';
import store, {getState} from '../../';
import {Music} from '../../../business/player';
import {List} from 'immutable';

const MAX_NUM = 150;

@Injectable({
  providedIn: 'root'
})
export class RecentService {
  private STORAGE_KEY = '__RECENT__';
  private setRecent = (list: Music[] | List<Music>) => {
    store.dispatch({
      type: 'SET_RECENT',
      value: list
    });
    this.storage.set(this.STORAGE_KEY, list);
  }
  constructor(
    private storage: StorageService
  ) {}
  init = () => {
    this.setRecent(
      this.storage.get(this.STORAGE_KEY) as Music[]
    );
  }
  getRecent = (): List<Music> => {
    return getState('recent');
  }
  add = (music: Music) => {
    if (!music) { return; }
    let recent = this.getRecent();
    const index = recent.findIndex(item => item.songid === music.songid);
    if (index > -1) {
      recent = recent.splice(index, 1);
    }
    recent = recent.unshift(music);
    if (recent.size > MAX_NUM) {
      recent = recent.splice(MAX_NUM, recent.size - MAX_NUM);
    }
    this.setRecent(recent);
  }
  del = (music: Music) => {
    const recent = this.getRecent();
    const index = recent.findIndex(item => item.songid === music.songid);
    if (index > -1) {
      this.setRecent(
        recent.delete(index)
      );
    }
  }
  clear = () => {
    this.setRecent([]);
  }
}
