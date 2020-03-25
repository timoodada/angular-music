import {animate, group, query, style, transition, trigger} from '@angular/animations';

export const modalAnimation = trigger('modalAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    group([
      animate('300ms ease', style({ opacity: 0 })),
      query('.modal-wrapper', [
        style({transformOrigin: 'center center', transform: 'scale(1)'}),
        animate('300ms ease', style({transform: 'scale(0)'}))
      ], { optional: true })
    ])
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      animate('0.3s ease', style({ opacity: 1 })),
      query('.modal-wrapper', [
        style({transformOrigin: 'center center', transform: 'scale(0)'}),
        animate('180ms ease', style({transform: 'scale(1.1)'})),
        animate('120ms ease', style({transform: 'scale(1)'}))
      ], { optional: true })
    ])
  ])
]);
