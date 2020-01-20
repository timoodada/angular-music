import { Injectable } from '@angular/core';
import {StorageService} from '../../../services/storage/storage.service';
import store, {getState} from '../../';
import {Music} from '../../../business/player';
import {List} from 'immutable';

const MAX_NUM = 200;

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private STORAGE_KEY = '__FAVORITE__';
  private setFavorite = (list: Music[] | List<Music>) => {
    store.dispatch({
      type: 'SET_FAVORITE',
      value: list
    });
    this.storage.set(this.STORAGE_KEY, list);
  }
  private getFavorites = (): List<Music> => {
    return getState('favorite');
  }
  private add = (music: Music) => {
    let favorites = this.getFavorites();
    favorites = favorites.unshift(music);
    if (favorites.size > MAX_NUM) {
      favorites = favorites.splice(MAX_NUM, favorites.size - MAX_NUM);
    }
    this.setFavorite(favorites);
  }
  private del = (music: Music) => {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(item => item.songid === music.songid);
    if (index > -1) {
      this.setFavorite(
        favorites.delete(index)
      );
    }
  }
  constructor(
    private storage: StorageService
  ) {
    this.init();
  }
  init = () => {
    this.setFavorite(
      this.storage.get(this.STORAGE_KEY) as Music[]
    );
  }
  toggleFavorite = (music: Music) => {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(item => item.songid === music.songid);
    if (index > -1) {
      this.del(music);
    } else {
      this.add(music);
    }
  }
  isFavorite = (music: Music) => {
    const favorites = this.getFavorites();
    return favorites.findIndex(item => item.songid === music.songid) > -1;
  }
}
