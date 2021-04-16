import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

import { IField, IRelay } from '../shared/field.model';
import { faCircle,  faTrash, faPen } from '@fortawesome/free-solid-svg-icons';


export enum RelayState {
  Flat = 'FLAT',
  inverted = 'INVERTED',
}


@Component({
  templateUrl: './relay-list.component.html',
  styleUrls:  ['./relay-list.component.scss']
})



export class RelayListComponent implements  OnInit{
  relays ;
  currentRelay: IRelay;
  fieldId: number;
  faCircle = faCircle;
  faTrash = faTrash;
  faPencil = faPen;
  field;
  showRelayForm = false;
  showOnlyTable = true;
  relayId: number;
  relayState = RelayState;
  currentUser;


  relayForm: FormGroup;
  state: FormControl;
  strength: FormControl;


  constructor(private hyperFluxService: HyperFluxService, private router: Router, private route: ActivatedRoute){
    // this.relays = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.fieldId  = params.id;
    });

    this.setCurrentUser();

    if (this.fieldId ) {
      // this.getField(this.fieldId);
      // this.getRealys(this.fieldId);
      const joinedWithObject = forkJoin({
        field:   this.hyperFluxService.getField(this.fieldId),
        relays: this.hyperFluxService.getRealys(this.fieldId)
      });

      joinedWithObject.subscribe(data => {
          this.field = data.field;
          this.field.relays = data.relays;
      });
    }
  }

  cancel(): void {
    this.showOnlyTable = true;
    this.showRelayForm = false;
  }

  setCurrentUser(): void{
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  deleteRelay():void{

  }

  editRelay(relay): void {
    this.currentRelay = relay;

    this.state = new FormControl(this.currentRelay.state, [Validators.required]);
    this.strength = new FormControl(this.currentRelay.strength, [Validators.required, Validators.max(10), Validators.min(0)]);

    this.relayForm = new FormGroup({
      state: this.state,
      strength: this.strength
    });
    this.showOnlyTable = false;
    this.showRelayForm = true;
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

  isOwner(): boolean{
    return this.currentUser.role === 'OWNER';
  }


  saveRelay(formValues): void{
    this.hyperFluxService.saveRelay(this.currentRelay.id, formValues).subscribe(data => {

      this.showOnlyTable = true;
      this.showRelayForm = false;
    },
    error => {
      console.error(error);
    })

  }

}

