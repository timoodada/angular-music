import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlJoinService {

  constructor() { }

  getSongAlbum = (albummid: string | number) => {
    return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
  }
  getSingerAvatar = (singermid: string | number) => {
    return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`;
  }
}
