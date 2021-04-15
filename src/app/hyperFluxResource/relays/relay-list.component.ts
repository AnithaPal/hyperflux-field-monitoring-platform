import { Component, OnInit } from '@angular/core';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { IField, IRelay } from '../shared/field.model';
import { faCircle,  faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './relay-list.component.html',
  styleUrls:  ['./relay-list.component.scss']
})



export class RelayListComponent implements  OnInit{
  relays ;
  fieldId: number;
  faCircle = faCircle;
  faTrash = faTrash;
  faPencil = faPen;
  field;
  showRelayForm = false;
  showOnlyTable = true;

  constructor(private hyperFluxService: HyperFluxService, private router: Router, private route: ActivatedRoute){
    // this.relays = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void{
     this.route.params.subscribe(params => {
      this.fieldId  = params.id;
    });

     if (this.fieldId ) {
      // this.getField(this.fieldId);
      // this.getRealys(this.fieldId);
      const joinedWithObject = forkJoin({
        field:   this.hyperFluxService.getField(this.fieldId),
        relays: this.hyperFluxService.getRealys(this.fieldId)
      });

      joinedWithObject.subscribe(data => {
          console.log(data);
          this.field = data.field;
          this.field.relays = data.relays;
      });
    }
  }

  editRelay() {

  }

  getRealys(fieldId: number): void {
    this.hyperFluxService.getRealys(fieldId)
    .subscribe(
      data => {
        this.relays = data;
        this.field.relays = this.relays;
      },
      error => {
        console.error(error);
      });
  }

  getField(fieldId: number): void {
    this.hyperFluxService.getField(fieldId)
    .subscribe(
      data => {
        this.field = data;
      },
      error => {
        console.error(error);
      });

  }

}
