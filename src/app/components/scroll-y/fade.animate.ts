import {trigger, transition, animate, style} from '@angular/animations';

export default trigger('fadeAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0.3s ease', style({ opacity: 0 }))
  ]),
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s ease', style({ opacity: 1 }))
  ])
]);
