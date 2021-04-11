import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'vSpaceLimit'})
export class VSpaceLimitPipe implements PipeTransform {
   transform(value: number): string {
    const usage = Math.round(value);
    return `${usage} Jt Total`;
   }
}
