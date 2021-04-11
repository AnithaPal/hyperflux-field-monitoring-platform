import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'encabulationRate'})
export class EncabulationRatePipe implements PipeTransform {
   transform(value: number): string {
     const rate =  Math.round(value);
     return `${rate}dk/s`;
   }
}
