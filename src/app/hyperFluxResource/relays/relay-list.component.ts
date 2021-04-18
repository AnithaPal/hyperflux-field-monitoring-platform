import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  closeResult: string;

  relayForm: FormGroup;
  state: FormControl;
  strength: FormControl;


  constructor(private hyperFluxService: HyperFluxService,
              private route: ActivatedRoute,
              private modalService: NgbModal){
  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.fieldId  = params.id;
    });

    this.setCurrentUser();

    if (this.fieldId ) {
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

  deleteRelay(relayId): void{
    this.hyperFluxService.deleteRelay(relayId).subscribe((response) => {
      this.ngOnInit();
    });
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

  open(content, relay): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteRelay(relay.id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveRelay(formValues): void{
    this.hyperFluxService.saveRelay(this.currentRelay.id, formValues).subscribe(data => {
      this.ngOnInit();
      this.showOnlyTable = true;
      this.showRelayForm = false;
    },
    error => {
      console.error(error);
    })

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

