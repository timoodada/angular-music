import {trigger, transition, animate, style, query, group} from '@angular/animations';

export const slideFromBottom = trigger('slideFromBottom', [
  transition(':leave', [
    style({ opacity: 1 }),
    group([
      query('.list-wrapper', [
        style({transform: 'translate3d(0, 0, 0)'}),
        animate('0.3s ease', style({transform: 'translate3d(0, 100%, 0)'}))
      ]),
      animate('0.3s ease', style({ opacity: 0 }))
    ])
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      query('.list-wrapper', [
        style({transform: 'translate3d(0, 100%, 0)'}),
        animate('0.3s ease', style({transform: 'translate3d(0, 0, 0)'}))
      ]),
      animate('0.3s ease', style({ opacity: 1 }))
    ])
  ])
]);
