import {trigger, transition, query, style, animate, group, animateChild} from '@angular/animations';

export const fadeAnimation = trigger('routeFadeAnimation', [
  transition(':leave', [
    style({ opacity: 1, overflow: 'hidden' }),
    animate('0.3s ease', style({ opacity: 0 }))
  ]),
  transition('fadein <=> fadeout', [
    style({
      position: 'relative'
    }),
    query(
      ':enter, :leave',
      [style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })],
      { optional: true }
    ),
    query(
      ':enter',
       [style({ opacity: 0 })],
       { optional: true }
    ),
    query(
      ':leave',
      [style({ opacity: 1 })],
      { optional: true }
    ),
    group([
      query(':leave', [
        animate('300ms ease', style({opacity: 0}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease', style({opacity: 1}))
      ], { optional: true })
    ])
  ])
]);
