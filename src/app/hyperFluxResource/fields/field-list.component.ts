import { Component, OnInit, OnDestroy } from '@angular/core';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { IField, IRelay } from '../shared/field.model';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']
})
export class FieldListComponent implements OnInit, OnDestroy  {
  field: IField;
  faCircle = faCircle;
  aperturePercentage: number;
  vsPercentage: number;
  relayCoont: number;
  relays: IRelay[];
  realyCount: number;
  teamId: number;
  subscriptions: Subscription[] = [];

  constructor(private hyperFluxService: HyperFluxService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.field = this.route.snapshot.data.fields[0];
    this.teamId = this.field.id;
    this.aperturePercentage = this.calculatePercentage(this.field.gfaBandwidthUsage, this.field.gfaBandwidthLimit);
    this.vsPercentage = this.calculatePercentage(this.field.vSpaceUsage, this.field.vSpaceLimit);
    this.subscriptions.push(interval(3000).subscribe(() => this.getFields()));
  }

  ngOnDestroy(): void {
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }

  private calculatePercentage(usage: number, limit: number): number {
    return Math.round(usage / limit * 100);
  }

  private getFields(): void{
    this.subscriptions.push(this.hyperFluxService.getFields().subscribe(data =>  {
      this.field = data[0] as IField;
    }));
 }
}
