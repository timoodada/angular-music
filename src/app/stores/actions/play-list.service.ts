import { Injectable } from '@angular/core';
import store from '../index';
import {HttpService} from '../../services/http/http.service';
import {Observable, of, throwError, zip} from 'rxjs';
import {Music} from '../../business/player';
import {map, tap} from 'rxjs/operators';
import {PlayMode} from '../../business/player/player.core';
import {List} from 'immutable';

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
    private http: HttpService
  ) {}
  _getState(): any {
    return store.getState();
  }
  _setCurrentSong(value: Music): any {
    return {
      type: 'SET_CURRENT_SONG',
      value
    };
  }
  _setPlayList = (value: Music[]) => {
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
  setPlayList = (list: any[], current: Music) => {
    store.dispatch(this._setPlayList(list));
    const songs = this._getState().get('playList');
    const playing: Music = this._getState().get('currentSong');
    if (playing && playing.songmid === current.songmid) { return; }
    const currentSong = songs.find(item => item.songmid === current.songmid);
    if (songs.size > 0) {
      store.dispatch(this._setCurrentSong(currentSong || songs.get(0)));
    } else {
      store.dispatch(this._setCurrentSong(null));
    }
  }
  play = (): Observable<[string, string]> => {
    const currentSong: Music = this._getState().get('currentSong');
    if (currentSong) {
      if (currentSong === this.currentSongInfo.info) {
        return of(this.currentSongInfo.playInfo);
      }
      return zip(
        this._getPlayUrl(currentSong.songmid),
        this._getLyric(currentSong.songid)
      ).pipe(
        tap(([url, lyric]) => {
          this.currentSongInfo = {
            info: currentSong,
            playInfo: [url, lyric]
          };
        })
      );
    }
    return throwError(new Error('no current song'));
  }
  playNext = (prev?: boolean) => {
    const mode = this._getState().get('playMode');
    const songs = this._getState().get('playList');
    const currentSong = this._getState().get('currentSong');
    let index = songs.findIndex(item => item === currentSong);
    switch (mode) {
      case PlayMode.sequence:
        if (prev) {
          index = index - 1 < 0 ? songs.size - 1 : index - 1;
        } else {
          index = (index + 1) % songs.size;
        }
        break;
      case PlayMode.loop:
        break;
      case PlayMode.random:
        const random = Math.floor(Math.random() * (songs.size - 1));
        if (random < index) {
          index = random;
        } else {
          index = random + 1;
        }
        break;
      default:
        break;
    }
    store.dispatch(this._setCurrentSong(songs.get(index)));
  }
  playPre = () => {
    this.playNext(true);
  }
  insertTail = (song: Music) => {
    const songs: List<Music> = this._getState().get('playList');
    songs.push(song);
  }
  insertNext = (song: Music) => {
    const songs: List<Music> = this._getState().get('playList');
    const index = songs.indexOf(song);
    if (index > -1) {
      songs.insert(index + 1, song);
    } else {
      this.insertTail(song);
    }
  }
}
