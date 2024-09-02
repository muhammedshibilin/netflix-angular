import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'banner',
  standalone:true
})
export class BannerPipe implements PipeTransform {

  transform(value: any, args?:number): any {
    return `${value.substring(0,args)}....`
  }

}
