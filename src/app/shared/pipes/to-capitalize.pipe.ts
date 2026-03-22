import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCapitalize',
})
export class ToCapitalizePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
