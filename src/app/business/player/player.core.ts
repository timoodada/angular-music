
type AudioEvents =
  'onTimeUpdate' |
  'onPlay' |
  'onEnded' |
  'onError';

enum PlayMode {
  loop,
  sequence,
  random
}

export { PlayMode };

export class MusicPlayer {
  public player: HTMLAudioElement;
  public get src() {
    return this.player ? this.player.currentSrc : null;
  }
  public set src(src: string) {
    if (this.player) {
      this.player.src = src;
    }
  }
  public get currentTime(): number {
    if (this.player) { return this.player.currentTime; }
    return 0;
  }
  public set currentTime(time: number) {
    if (this.player) { this.player.currentTime = time; }
  }
  public get duration(): number {
    if (this.player) { return this.player.duration; }
    return 0;
  }
  public get readyState() {
    if (this.player) { return this.player.readyState; }
    return false;
  }

  constructor() {
    const player = this.player = document.createElement('audio');
    player.autoplay = true;
  }

  play = (src?: string) => {
    if (this.player) {
      if (src) {
        this.src = src;
      }
      return this.player.play();
    }
    return Promise.reject(new Error('player does not exist'));
  }
  on = (eventName: AudioEvents, fn): void => {
    this.player[eventName.toLowerCase()] = fn;
  }
}
