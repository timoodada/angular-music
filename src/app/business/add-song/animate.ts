import {trigger, transition, animate, style} from '@angular/animations';

export const addSongAnimation = trigger('addSongAnimation', [
  transition(':leave', [
    style({ opacity: 1,  transform: 'translate3d(0, 0, 0)'}),
    animate('0.3s ease', style({transform: 'translate3d(0, 100%, 0)', opacity: 0}))
  ]),
  transition(':enter', [
    style({ opacity: 0,  transform: 'translate3d(0, 100%, 0)'}),
    animate('0.3s ease', style({transform: 'translate3d(0, 0, 0)', opacity: 1}))
  ])
]);
