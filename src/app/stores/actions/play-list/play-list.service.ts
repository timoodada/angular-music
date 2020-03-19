import { Injectable } from '@angular/core';
import store, {getState} from '../../index';
import {HttpService} from '../../../services/http/http.service';
import {Observable, of, throwError, zip} from 'rxjs';
import {Music} from '../../../business/player';
import {map, tap} from 'rxjs/operators';
import {PlayMode} from '../../../business/player/player.core';
import {List} from 'immutable';
import {ModalService} from '../../../services/modal/modal.service';
import {PlayModeService} from '../play-mode/play-mode.service';

function unescapeHTML(lrc: string): string {
  const t = document.createElement('div');
  t.innerHTML = lrc + '';
  return t.innerText;
}

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  private currentSongInfo: {
    info?: Music,
    playInfo?: [string, string]
  } = {};
  constructor(
    private http: HttpService,
    private modal: ModalService,
    private playMode: PlayModeService
  ) {}
  _setCurrentSong(value: Music): any {
    return {
      type: 'SET_CURRENT_SONG',
      value
    };
  }
  _setPlayList = (value: Music[] | List<Music>) => {
    if (!value) {
      value = [];
    }
    return {
      type: 'SET_PLAY_LIST',
      value
    };
  }
  _getPlayUrl = (songmid) => {
    const data = JSON.stringify(
      {
        req_0: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: {
            guid: '7500658880',
            songmid: [songmid],
            songtype: [],
            uin: '0',
            loginflag: 0,
            platform: '23',
            h5to: 'speed'
          }
        }, comm: {uin: 0, format: 'json', ct: 23, cv: 0}
      }
    );
    return this.http.musicPost(
      `https://u.y.qq.com/cgi-bin/musicu.fcg?_=${Date.now()}`,
      data
    ).pipe(
      map(res => {
        res = res.req_0.data;
        return `${res.sip[0]}${res.midurlinfo[0].purl}`;
      })
    );
  }
  _getLyric = (musicid) => {
    return this.http.musicGet(
      `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg`,
      {
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        nobase64: 1,
        musicid,
        songtype: 0,
        _: Date.now()
      },
      { responseType: 'text' }
    ).pipe(
      map(res => {
        // tslint:disable-next-line:no-eval
        res = eval(`function MusicJsonCallback(r) {return r}${res}`);
        if (res.code === 0) {
          return unescapeHTML(res.lyric);
        }
        return '';
      })
    );
  }
  setPlayList = (list: List<Music> | Music[], current: Music) => {
    store.dispatch(this._setPlayList(list));
    const songs = getState('playList');
    const currentSong = songs.find(item => item.songmid === current.songmid) || songs.get(0);
    if (!currentSong) {
      this.currentSongInfo = {};
      store.dispatch(this._setCurrentSong(null));
    }
    return this.play(currentSong);
  }
  // Get music play url and lyric data
  play = (music: Music): Observable<[string, string]> => {
    if (music) {
      if (music === this.currentSongInfo.info) {
        return of(this.currentSongInfo.playInfo);
      }
      return zip(
        this._getPlayUrl(music.songmid),
        this._getLyric(music.songid)
      ).pipe(
        tap(([url, lyric]) => {
          store.dispatch(this._setCurrentSong(music));
          this.currentSongInfo = {
            info: music,
            playInfo: [url, lyric]
          };
        })
      );
    }
    return throwError(new Error('Current song does not exist'));
  }
  getRandomIndex = (total: number, currentIndex: number = -1) => {
    let index;
    const random = Math.floor(Math.random() * (total - 1));
    if (random < currentIndex) {
      index = random;
    } else {
      index = random + 1;
    }
    return index;
  }
  getValidList = (list: List<Music> | Music[]): List<Music> | Music[] => {
    return (list as any).filter(val => !val.vip);
  }
  filterPlayList = (item: Music, list: List<Music> | Music[]): Observable<[string, string]> => {
    if (item.vip) {
      this.modal.alert({ content: '无法播放vip歌曲' }).then(() => {
        // closed
      });
      return throwError(new Error('无法播放vip歌曲'));
    }
    const filterList = this.getValidList(list);
    return this.setPlayList(filterList, item);
  }
  randomPlay = (list: List<Music> | Music[]): Observable<[string, string]> => {
    const filterList = List(this.getValidList(list));
    if (filterList.size <= 0) {
      this.modal.alert({ content: '没有可以播放的歌曲' }).then(() => {
        // closed
      });
      return throwError(new Error('没有可以播放的歌曲'));
    }
    this.playMode.setPlayMode(PlayMode.random);
    return this.setPlayList(filterList, filterList.get(this.getRandomIndex(filterList.size)));
  }
  playNext = (prev?: boolean) => {
    const mode: PlayMode = getState('playMode');
    const songs: List<Music> = getState('playList');
    const currentSong: Music = getState('currentSong');
    let index = songs.indexOf(currentSong);
    let nextIndex;
    if (prev) {
      nextIndex = index - 1 < 0 ? songs.size - 1 : index - 1;
    } else {
      nextIndex = (index + 1) % songs.size;
    }
    switch (mode) {
      case PlayMode.sequence:
        index = nextIndex;
        break;
      case PlayMode.loop:
        index = nextIndex;
        break;
      case PlayMode.random:
        index = this.getRandomIndex(songs.size, index);
        break;
      default:
        break;
    }
    return this.play(songs.get(index));
  }
  playPre = () => {
    return this.playNext(true);
  }
  insertTail = (song: Music): Promise<any> => {
    const songs: List<Music> = getState('playList');
    const index = songs.findIndex(item => item.songmid === song.songmid);
    if (index > -1) { return Promise.reject(new Error('已在播放列表')); }
    store.dispatch(
      this._setPlayList(songs.push(song))
    );
    return Promise.resolve();
  }
  insertNext = (song: Music) => {
    let songs: List<Music> = getState('playList');
    const index = songs.findIndex(item => item.songmid === song.songmid);
    if (index > -1) {
      songs = songs.splice(index, 1);
    }
    const current: Music = getState('currentSong');
    const currentIndex = songs.indexOf(current);
    songs = songs.insert(currentIndex + 1, song);
    store.dispatch(
      this._setPlayList(songs)
    );
  }
  delOne = (music: Music) => {
    const songs: List<Music> = getState('playList');
    const currentSong: Music = getState('currentSong');
    const index = songs.indexOf(music);
    if (index > -1) {
      store.dispatch(
        this._setPlayList(songs.delete(index))
      );
      if (currentSong === music) {
        return this.play(
          songs.get((index + 1) % songs.size)
        );
      }
    }
    return of(null);
  }
  delAll = (): void => {
    store.dispatch(
      this._setPlayList([])
    );
    store.dispatch(
      this._setCurrentSong(null)
    );
  }
}
