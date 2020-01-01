import { Injectable } from '@angular/core';
import {StorageService} from '../../../services/storage/storage.service';
import store, {getState} from '../../';
import {Music} from '../../../business/player';
import {List} from 'immutable';

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
  constructor(
    private storage: StorageService
  ) {}
  init = () => {
    this.setFavorite(
      this.storage.get(this.STORAGE_KEY) as Music[]
    );
  }
  add = (music: Music) => {
    const favorites = getState('favorite');
    this.setFavorite(
      favorites.push(music)
    );
  }
  del = (music: Music) => {
    const favorites = getState('favorite');
    const index = favorites.indexOf(music);
    if (index > -1) {
      this.setFavorite(
        favorites.delete(index)
      );
    }
  }
}
