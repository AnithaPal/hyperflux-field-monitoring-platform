import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'fieldStatus'})
export class FieldStabilityStatusPipe implements PipeTransform {
   transform(status: boolean): string {
     return status === true ? 'Critical'  : 'Stable';
   }
}
