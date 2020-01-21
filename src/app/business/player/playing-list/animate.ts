import {trigger, transition, animate, style, query, group} from '@angular/animations';

export const slideFromBottom = trigger('slideFromBottom', [
  transition(':leave', [
    style({ opacity: 1 }),
    group([
      query('.list-wrapper', [
        style({transform: 'translate3d(0, 0, 0)'}),
        animate('300ms ease', style({transform: 'translate3d(0, 100%, 0)'}))
      ]),
      animate('300ms ease', style({ opacity: 0 }))
    ])
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      query('.list-wrapper', [
        style({transform: 'translate3d(0, 100%, 0)'}),
        animate('300ms ease', style({transform: 'translate3d(0, 0, 0)'}))
      ]),
      animate('300ms ease', style({ opacity: 1 }))
    ])
  ])
]);

export const delAnimation = trigger('delAnimation', [
  transition(':leave', [
    style({ opacity: 1, overflow: 'hidden' }),
    animate('300ms ease', style({ height: 0, opacity: 0 }))
  ])
]);
