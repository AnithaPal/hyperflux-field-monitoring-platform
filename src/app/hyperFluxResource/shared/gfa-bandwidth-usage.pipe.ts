import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'gfaBandwidthUage'})
export class GfaBandwidthUsagePipe implements PipeTransform {
   transform(value: number): string {
    const usage = value.toFixed(2);
    return `${usage} Hf Used`;
   }
}
