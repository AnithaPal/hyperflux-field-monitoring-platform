import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { IRelay } from '../shared/field.model';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html',
  styles: [
    `
    .card {
      background-color: #282829;
      margin: 0px 0px 10px 0px;
    }
    .utilization-status {
      padding-left: 16px;
      position: relative;
    }
    `
  ]
})

export class RelayComponent implements OnInit{
  @Input() fieldId: number;
  relays: IRelay[];
  relayCount: number;

  constructor(private hyperFluxService: HyperFluxService, private router: Router){
  }

  ngOnInit(): void{
    this.getRealys(this.fieldId);
  }

  navigateToRelayList(): void{
    this.router.navigate([`fields/${this.fieldId}/relays`], { state: this.relays });
  }

  getRealys(fieldId: number): void {
    this.hyperFluxService.getRealys(fieldId).subscribe(
      data => {
        this.relays = data;
        this.relayCount = this.relays.length;
      },
      error => {
        console.error(error);
      });
  }
}

