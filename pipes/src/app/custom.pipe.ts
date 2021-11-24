import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
})
export class CustomPipe implements PipeTransform {
  transform(value: string, controlstr: boolean): unknown {
    if (value.length > 10) {
      return controlstr ? value.substring(0, 10) + '...' : value;
    }
    return value;
  }
}
