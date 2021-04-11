import { Component, OnInit } from '@angular/core';
import { HyperFluxService } from '../hyper-flux-service';
import { ActivatedRoute } from '@angular/router';
import { IField } from '../field.model';
import {SidebarComponent} from '../../nav/sidebar/sidebar.component';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

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


  constructor(private hyperFluxService: HyperFluxService, private route: ActivatedRoute){}

  ngOnInit(){
    this.field = this.route.snapshot.data.fields[0];
    this.aperturePercentage = this.calculatePercentage(this.field.gfaBandwidthUsage, this.field.gfaBandwidthLimit);
    this.vsPercentage = this.calculatePercentage(this.field.vSpaceUsage, this.field.vSpaceLimit);
    console.log('fields is ' + this.field);
  }

  calculatePercentage(usage: number, limit: number): number {
    return Math.round(usage / limit * 100);
  }

}
