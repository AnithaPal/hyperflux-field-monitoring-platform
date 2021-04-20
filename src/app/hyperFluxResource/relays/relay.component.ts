import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { IRelay } from '../shared/field.model';

@Component({
  selector: 'app-relay',
  templateUrl: './relay.component.html',
  styles: [
    `
    .btn-dark {
      background-color: #1e1e20;
      font-size: 14px;
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
    this.getRelays(this.fieldId);
  }

  navigateToRelayList(): void{
    this.router.navigate([`fields/${this.fieldId}/relays`]);
  }

  getRelays(fieldId: number): void {
    this.hyperFluxService.getRelays(fieldId).subscribe(
      data => {
        this.relays = data;
        this.relayCount = this.relays.length;
      },
      error => {
        console.error(error);
      });
  }
}

