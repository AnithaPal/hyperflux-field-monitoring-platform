import { Component, Input, OnInit } from '@angular/core';
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
  @Input() teamId: number;
  relays: IRelay[];
  relayCount: number;

  constructor(private hyperFluxService: HyperFluxService){
  }

  ngOnInit(): void{
    this.getRealys(this.teamId);
  }

  getRealys(teamId: number): void {
    this.hyperFluxService.getRealys(teamId).subscribe(
      data => {
        console.log(data);
        this.relays = data;
        this.relayCount = this.relays.length;
      },
      error => {
        console.error(error);
      });
  }
}

