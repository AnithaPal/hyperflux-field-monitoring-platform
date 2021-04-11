import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'vSpaceUsage'})
export class VSpaceUsagePipe implements PipeTransform {
   transform(value: number): string {
    const usage = Math.round(value);
    return `${usage} Kt Used`;
   }
}
