import {  Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IField } from '../hyperFluxResource/shared/field.model';
import { HyperFluxService } from './shared/hyper-flux-service';
@Injectable()
export class FieldListResolver implements Resolve <any> {
  constructor(private hyperFluxService: HyperFluxService) {

  }

  resolve(): Observable<IField[]> {
    return this.hyperFluxService.getFields();
  }
}
