import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'gfaBandwidthLimit'})
export class GfaBandwidthLimitPipe implements PipeTransform {
   transform(value: number): string {
    const limit = value.toFixed(2);
    return `${limit} Hf Limit`;
   }
}
