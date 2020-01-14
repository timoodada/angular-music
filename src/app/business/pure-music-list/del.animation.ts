import {trigger, transition, animate, style} from '@angular/animations';

export default trigger('delAnimation', [
  transition(':leave', [
    style({ opacity: 1, overflow: 'hidden' }),
    animate('0.3s ease', style({ height: 0, opacity: 0 }))
  ])
]);
