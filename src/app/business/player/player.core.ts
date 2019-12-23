
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
  public instance: HTMLAudioElement;
  public get src() {
    return this.instance ? this.instance.currentSrc : null;
  }
  public set src(src: string) {
    if (this.instance) {
      this.instance.src = src;
    }
  }
  public get currentTime(): number {
    if (this.instance) { return this.instance.currentTime; }
    return 0;
  }
  public set currentTime(time: number) {
    if (this.instance) { this.instance.currentTime = time; }
  }
  public get duration(): number {
    if (this.instance) { return this.instance.duration; }
    return 0;
  }
  public get readyState() {
    if (this.instance) { return this.instance.readyState; }
    return false;
  }

  constructor() {
    const player = this.instance = document.createElement('audio');
    player.autoplay = true;
  }

  play = (src?: string): Promise<any> => {
    if (this.instance) {
      if (src) {
        this.src = src;
      }
      return this.instance.play();
    }
    return Promise.reject(new Error('player does not exist'));
  }
  pause = () => {
    this.instance.pause();
  }
  on = (eventName: AudioEvents, fn): void => {
    this.instance[eventName.toLowerCase()] = fn;
  }
}
