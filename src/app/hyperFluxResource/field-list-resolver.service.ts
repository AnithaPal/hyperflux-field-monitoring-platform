import {  Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HyperFluxService } from './hyper-flux-service';

@Injectable()
export class FieldListResolver implements Resolve <any> {
  constructor(private hyperFluxService: HyperFluxService) {

  }

  resolve() {
    return this.hyperFluxService.getFields();
  }
}
