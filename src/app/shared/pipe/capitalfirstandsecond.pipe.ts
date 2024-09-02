import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalfirstandsecond',
  standalone:true
})
export class CapitalfirstandsecondPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.slice(0,2).toUpperCase()+value.slice(2)
  }

}
