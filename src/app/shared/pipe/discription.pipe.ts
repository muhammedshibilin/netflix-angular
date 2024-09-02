import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discription',
  standalone:true
})
export class DiscriptionPipe implements PipeTransform {

  transform(value: string, args?:number): any {
    return `${value.substring(0,args)}...`;
  }

}
