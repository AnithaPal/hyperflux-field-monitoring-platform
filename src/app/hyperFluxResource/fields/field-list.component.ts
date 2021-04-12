import { Component, OnInit } from '@angular/core';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { ActivatedRoute } from '@angular/router';
import { IField, IRelay } from '../shared/field.model';
import { faCircle, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filed-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.scss']

})

export class FieldListComponent implements OnInit  {
  field: IField;
  faCircle = faCircle;
  aperturePercentage: number;
  vsPercentage: number;
  relayCoont: number;
  relays: IRelay[];
  realyCount: number;
  teamId: number;


  constructor(private hyperFluxService: HyperFluxService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.field = this.route.snapshot.data.fields[0];
    this.teamId = this.field.id;
    this.aperturePercentage = this.calculatePercentage(this.field.gfaBandwidthUsage, this.field.gfaBandwidthLimit);
    this.vsPercentage = this.calculatePercentage(this.field.vSpaceUsage, this.field.vSpaceLimit);
  }

  private calculatePercentage(usage: number, limit: number): number {
    return Math.round(usage / limit * 100);
  }

  private getFields(): void{
    this.hyperFluxService.getFields().subscribe(
      data => {
        this.field =  data[0];
      }
    )
  }
}
