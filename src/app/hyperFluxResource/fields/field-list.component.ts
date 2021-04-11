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
  fields: IField[];
  faCircle = faCircle;

  constructor(private hyperFluxService: HyperFluxService, private route: ActivatedRoute){}

  ngOnInit(){
    this.fields = this.route.snapshot.data.fields;
    console.log('fields is ' + this.fields);
  }

}
