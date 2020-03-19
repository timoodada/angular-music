import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appList'
})
export class ListPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof value === 'number') {
      return new Array(value).fill(0).map((item, key) => key);
    } else {
      return [];
    }
  }

}
