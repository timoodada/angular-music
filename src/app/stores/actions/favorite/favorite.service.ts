import {Injectable} from '@angular/core';
import {StorageService} from '../../../services/storage/storage.service';
import store, {getState} from '../../';
import {Music} from '../../../business/player';
import {List} from 'immutable';
import {HttpService} from '../../../services/http/http.service';
import {urlParser} from '../../../helpers/url';
import {queryParse, queryString} from '../../../helpers/query';
import {UrlJoinService} from '../../../services/url-join/url-join.service';
import {ModalService} from '../../../services/modal/modal.service';
import {Observable, throwError} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {tap} from 'rxjs/operators';

const MAX_NUM = 200;

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private STORAGE_KEY = '__FAVORITE__';
  private API_FAVORITE = '__api_favorites__';
  private sheetList: any[] = [];
  private setFavorite = (list: Music[] | List<Music>) => {
    store.dispatch({
      type: 'SET_FAVORITE',
      value: list
    });
    this.storage.set(this.STORAGE_KEY, list);
  };
  private setRemoteFavorites = (list: Music[] | List<Music>) => {
    store.dispatch({
      type: 'SET_REMOTE_FAVORITE',
      value: list
    });
  };
  private asyncSetRemoteFavorite = (list: Music[] | List<Music>) => {
    setTimeout(() => {
      this.setRemoteFavorites(list);
    });
  };
  private getFavorites = (): List<Music> => {
    return getState('favorite');
  };
  private getRemoteFavorite = (): List<Music> => {
    return getState('remoteFavorite');
  };
  private add = (music: Music) => {
    let favorites = this.getFavorites();
    const index = favorites.findIndex(item => item.songid === music.songid);
    if (index === -1) {
      favorites = favorites.unshift(music);
    }
    if (favorites.size > MAX_NUM) {
      favorites = favorites.splice(MAX_NUM, favorites.size - MAX_NUM);
    }
    this.setFavorite(favorites);
  };
  private del = (music: Music) => {
    const favorites = this.getFavorites();
    const index = favorites.findIndex(item => item.songid === music.songid);
    if (index > -1) {
      this.setFavorite(
        favorites.delete(index)
      );
    }
  };
  private getSheetList = () => {
    const userInfo = getState('userInfo');
    this.http.get('/splcloud/fcgi-bin/songlist_list.fcg', {
      utf8: 1,
      uin: userInfo.get('id'),
      rnd: Math.random(),
      g_tk_new_20200303: userInfo.get('g_tk_new'),
      g_tk: userInfo.get('g_tk'),
      loginUin: userInfo.get('id'),
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }).subscribe(res => {
      if (res.retcode === 0) {
        this.sheetList = res.list.map(item => {
          return {
            dirname: item.dirname,
            dirid: item.dirid
          };
        });
      }
    });
  };
  private remoteAdd = (music: Music): Observable<any> => {
    const userInfo = getState('userInfo');
    const dirid = this.getFavoriteDirId();
    if (userInfo.get('status') !== 1) {
      return throwError(new Error('Not Login'));
    }
    if (!dirid) {
      return fromPromise(
        this.modal.alert({content: '参数错误，请刷新页面或重新登陆'})
      );
    }
    return this.http.post(
      `/splcloud/fcgi-bin/fcg_music_add2songdir.fcg?g_tk=${userInfo.get('g_tk')}&g_tk_new_20200303=${userInfo.get('g_tk_new')}`,
      {
        loginUin: userInfo.get('id'),
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.post',
        needNewCode: 0,
        uin: userInfo.get('id'),
        typelist: 13,
        dirid,
        formsender: 4,
        midlist: music.songmid,
        source: 153,
        r2: 0,
        r3: 1,
        utf8: 1,
        g_tk: userInfo.get('g_tk')
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(
      tap(res => {
        if (res.code === 0) {
          const favorite = this.getRemoteFavorite();
          const index = favorite.findIndex(val => val.songid === music.songid);
          if (index === -1) {
            this.setRemoteFavorites(
              favorite.unshift(music)
            );
          }
        }
      }));
  };
  private remoteDel = (music: Music): Observable<any> => {
    const userInfo = getState('userInfo');
    const dirid = this.getFavoriteDirId();
    if (userInfo.get('status') !== 1) {
      return throwError(new Error('Not Login'));
    }
    if (!dirid) {
      return fromPromise(
        this.modal.alert({content: '参数错误，请刷新页面或重新登陆'})
      );
    }
    return this.http.post(
      `/qzone/fcg-bin/fcg_music_delbatchsong.fcg?g_tk=${userInfo.get('g_tk')}&g_tk_new_20200303=${userInfo.get('g_tk_new')}`,
      {
        loginUin: userInfo.get('id'),
        hostUin: 0,
        format: 'json',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.post',
        needNewCode: 0,
        uin: userInfo.get('id'),
        typelist: 13,
        dirid,
        formsender: 4,
        ids: music.songid,
        source: 103,
        flag: 2,
        from: 3,
        types: 3,
        utf8: 1,
        g_tk: userInfo.get('g_tk')
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(
      tap(res => {
        if (res.code === 0) {
          const favorite = this.getRemoteFavorite();
          const index = favorite.findIndex(val => val.songid === music.songid);
          if (index > -1) {
            this.setRemoteFavorites(
              favorite.remove(index)
            );
          }
        }
      }));
  };
  private getFavoriteDirId = () => {
    const item = this.sheetList.find(val => val.dirname === '我喜欢');
    return item?.dirid;
  };

  constructor(
    private storage: StorageService,
    private http: HttpService,
    private urlJoinService: UrlJoinService,
    private modal: ModalService
  ) {
    let userInfo = getState('userInfo');
    this.init();
    store.subscribe(() => {
      if (userInfo.get('status') === 0 && getState('userInfo').get('status') === 1) {
        this.fetchRemoteFavorite();
      } else if (userInfo.get('status') === 1 && getState('userInfo').get('status') === 0) {
        this.asyncSetRemoteFavorite([]);
      }
      userInfo = getState('userInfo');
    });
  }

  init = () => {
    this.setFavorite(
      this.storage.get(this.STORAGE_KEY) as Music[]
    );
  };
  public fetchRemoteFavorite = () => {
    const parse = urlParser(
      this.storage.get(this.API_FAVORITE) as string
    );
    const query = queryParse(parse.query);
    query.song_num = MAX_NUM;
    this.http.get(
      parse.path.replace(parse.origin, ''),
      query
    ).subscribe(res => {
      if (res.code === 0) {
        const songs: Music[] = res.songlist.map(item => {
          return {
            name: item.title,
            singer: item.singer.map(val => val.name).join(','),
            album: item.album.name,
            vip: !!item.pay.pay_play,
            songmid: item.mid,
            songid: item.id,
            duration: item.interval,
            image: this.urlJoinService.getSongAlbum(item.album.mid)
          };
        });
        this.setRemoteFavorites(songs);
      }
    });
    this.getSheetList();
  };
  toggleFavorite = (music: Music): Observable<any> => {
    const favorites = getState('userInfo').get('status') === 1 ?
      this.getRemoteFavorite() :
      this.getFavorites();
    const index = favorites.findIndex(item => item.songid === music.songid);
    if (index > -1) {
      this.del(music);
      return this.remoteDel(music);
    } else {
      this.add(music);
      return this.remoteAdd(music);
    }
  };
  isFavorite = (music: Music) => {
    const favorites = getState('userInfo').get('status') === 1 ?
      this.getRemoteFavorite() :
      this.getFavorites();
    return favorites.findIndex(item => item.songid === music.songid) > -1;
  };
  clear = () => {
    this.setFavorite([]);
  };
}
