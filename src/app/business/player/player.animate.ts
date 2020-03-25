import {trigger, transition, animate, style, query, group} from '@angular/animations';

export const miniAnimation = trigger('miniAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.3s ease', style({ opacity: 0 }))
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s ease', style({ opacity: 1 }))
  ])
]);

const paddingLeft = 40;
const paddingTop = 80;
const paddingBottom = 30;
const targetWidth = 20;
const width = document.body.clientWidth * 0.8 / 2;
const x = -(document.body.clientWidth / 2 - paddingLeft);
const y = document.body.clientHeight - width / 2 - paddingTop - paddingBottom;
const scale = targetWidth / width;
const pos = {x, y, scale};
export const normalAnimation = trigger('normalAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    group([
      query('.top', [
        style({ transform: 'translate3d(0, 0, 0)' }),
        animate('400ms linear', style({ transform: 'translate3d(0, -100px, 0)' }))
      ], { optional: true }),
      query('.bottom', [
        style({ transform: 'translate3d(0, 0, 0)' }),
        animate('400ms linear', style({ transform: 'translate3d(0, 100px, 0)' }))
      ], { optional: true }),
      animate('400ms ease', style({ opacity: 0 })),
      query('.cd-wrapper', [
        animate('400ms linear', style({ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pos.scale})` }))
      ], { optional: true })
    ])
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      animate('400ms ease', style({ opacity: 1 })),
      query('.top', [
        style({
          transform: 'translate3d(0, -100px, 0)'
        }),
        animate('400ms cubic-bezier(0.86, 0.18, 0.82, 1.32)', style({ transform: 'translate3d(0, 0, 0)' }))
      ], { optional: true }),
      query('.bottom', [
        style({
          transform: 'translate3d(0, 100px, 0)'
        }),
        animate('400ms cubic-bezier(0.86, 0.18, 0.82, 1.32)', style({ transform: 'translate3d(0, 0, 0)' }))
      ], { optional: true }),
      query('.cd-wrapper', [
        style({ transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pos.scale})` }),
        animate('240ms linear', style({ transform: `translate3d(0, 0, 0) scale(1.1)` })),
        animate('160ms linear', style({ transform: `translate3d(0, 0, 0) scale(1)` }))
      ], { optional: true })
    ])
  ])
]);
