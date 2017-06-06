import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'comma'})
export class CommaSeparatedNumberPipe implements PipeTransform {

  transform(value:number, args:string[]) : any {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
}
