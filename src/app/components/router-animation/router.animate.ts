/*
* The parent container must contain the following styles:
* {
*   position: relative;
*   height: xx;
*   width: xx;
*   overflow-x: hidden;
* }
*
* The child container must contain the following styles:
* {
*   position: absolute;
*   top：0;
*   left: 0;
*   width: 100%;
*   height: 100%;
* }
*
*/

import {trigger, transition, query, style, animate, group, animateChild} from '@angular/animations';

const commonQuery = query(
      ':enter, :leave',
      [style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })],
      { optional: true }
    );

export const slideAnimation = trigger('routeAnimation', [
  transition('bridge <=> backward, forward => backward', [
    commonQuery,
    query(
      ':enter',
       [style({ transform: 'translateX(-100%)' })],
       { optional: true }
    ),
    query(
      ':leave',
      animateChild(),
      { optional: true }
    ),
    group([
      query(':leave', [
        animate('300ms ease-out', style({transform: 'translateX(100%)'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({transform: 'translateX(0)'}))
      ], { optional: true })
    ]),
    query(
      ':enter',
      animateChild(),
      { optional: true }
    )
  ]),
  transition('bridge <=> forward, backward => forward', [
    commonQuery,
    query(
      ':enter',
       [style({ transform: 'translateX(100%)' })],
       { optional: true }
    ),
    query(
      ':leave',
      animateChild(),
      { optional: true }
    ),
    group([
      query(':leave', [
        animate('300ms ease-out', style({transform: 'translateX(-100%)'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({transform: 'translateX(0)'}))
      ], { optional: true })
    ]),
    query(
      ':enter',
      animateChild(),
      { optional: true }
    )
  ]),
  transition('backward <=> none, forward <=> none, bridge <=> none', [
    commonQuery,
    query(
      ':enter',
       [style({ transform: 'translateX(100%)' })],
       { optional: true }
    ),
    query(
      ':leave',
      animateChild(),
      { optional: true }
    ),
    group([
      query(':leave', [
        animate('300ms ease-out', style({transform: 'translateX(100%)'}))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease-out', style({transform: 'translateX(0)'}))
      ], { optional: true })
    ]),
    query(
      ':enter',
      animateChild(),
      { optional: true }
    )
  ]),
  transition('hide <=> fade', [
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
