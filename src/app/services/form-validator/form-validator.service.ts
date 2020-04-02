import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }
  validate = (control: FormGroup): Promise<FormGroup> => {
    if (!control.pending) {
      return Promise.resolve(control);
    }
    return new Promise((resolve) => {
      const subscription = control.statusChanges.subscribe( () => {
        if (!control.pending) {
          resolve(control);
          subscription.unsubscribe();
        }
      });
    });
  }
}
