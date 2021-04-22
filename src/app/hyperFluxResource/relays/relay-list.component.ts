import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IRelay, IField } from '../shared/field.model';
import { ITeam, IUser } from '../../user/user.model';
import { faCircle,  faTrash, faPen, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';

export enum RelayState {
  Flat = 'FLAT',
  inverted = 'INVERTED',
}
@Component({
  templateUrl: './relay-list.component.html',
  styleUrls:  ['./relay-list.component.scss']
})

export class RelayListComponent implements  OnInit{
  relays: IRelay[];
  currentRelay: IRelay;
  fieldId: number;
  faCircle = faCircle;
  faTrash = faTrash;
  faPencil = faPen;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  field: IField;
  showRelayForm = false;
  showOnlyTable = true;
  relayId: number;
  relayState = RelayState;
  currentUser: IUser;
  closeResult: string;
  relayForm: FormGroup;
  state: FormControl;
  strength: FormControl;
  page = 1;
  pageSize = 10;
  collectionSize: number;
  owner: boolean;
  teamId: ITeam;


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
        relays: this.hyperFluxService.getRelays(this.fieldId)
      });

      joinedWithObject.subscribe(data => {
          this.field = data.field;
          this.field.relays = data.relays;
          this.collectionSize = data.relays.length;
      }, error => {
        console.error(error);
      });
    }
  }

  cancel(): void {
    this.showOnlyTable = true;
    this.showRelayForm = false;
  }

  setCurrentUser(): void{
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.owner = this.isOwner();
    this.teamId = this.currentUser.team;
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



  isOwner(): boolean{
    return this.currentUser.role === 'OWNER';
  }

  open(content: string, relay: IRelay): void {
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
    });
  }

  refreshRelays(): void {
    this.field.relays
      .map((relay, i) => ({id: i + 1, ...relay}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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

