import { Component, OnInit } from '@angular/core';
import { HyperFluxService } from '../hyper-flux-service';
import { ActivatedRoute } from '@angular/router';
import { IField } from '../field.model';

@Component({
  selector: 'app-filed-list',
  templateUrl: './field-list.component.html'
})

export class FieldListComponent implements OnInit  {
  fields: IField[];

  constructor(private hyperFluxService: HyperFluxService, private route: ActivatedRoute){}

  ngOnInit(){
    this.fields = this.route.snapshot.data.fields;
    console.log('fields is ' + this.fields);
  }

}
