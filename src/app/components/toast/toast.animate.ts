import {animate, group, sequence, style, transition, trigger} from '@angular/animations';

export const toastAnimation = trigger('toastAnimation', [
  transition(':leave', [
    style({ opacity: 1, transformOrigin: 'left top', transform: 'scale(1) translate(-50%, -50%)' }),
    animate('300ms ease', style({ opacity: 0, transform: 'scale(0) translate(-50%, -50%)' }))
  ]),
  transition(':enter', [
    style({ opacity: 0, transformOrigin: 'left top', transform: 'scale(0) translate(-50%, -50%)' }),
    group([
      animate('300ms ease', style({ opacity: 1 })),
      sequence([
        animate('180ms ease', style({transform: 'scale(1.1) translate(-50%, -50%)'})),
        animate('120ms ease', style({transform: 'scale(1) translate(-50%, -50%)'}))
      ])
    ])
  ])
]);
