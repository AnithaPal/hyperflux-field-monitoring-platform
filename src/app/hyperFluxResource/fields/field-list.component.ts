import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HyperFluxService } from '../shared/hyper-flux-service';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { IField, IRelay } from '../shared/field.model';
import { ITeam, IUser } from '../../user/user.model';
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
  relayCount: number;
  fieldId: number;
  subscriptions: Subscription[] = [];
  showFieldForm = false;
  showStatus = true;
  currentUser: IUser;
  owner: boolean;
  teamId: number;

  fieldForm: FormGroup;
  connections: FormControl;
  vSpaceLimit: FormControl;
  gfaBandwidthLimit: FormControl;

  constructor(private hyperFluxService: HyperFluxService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.field = this.route.snapshot.data.fields[0];
    this.fieldId = this.field.id;
    this.aperturePercentage = this.calculatePercentage(this.field.gfaBandwidthUsage, this.field.gfaBandwidthLimit);
    this.vsPercentage = this.calculatePercentage(this.field.vSpaceUsage, this.field.vSpaceLimit);
    this.connections = new FormControl(this.field.connections, [Validators.required, Validators.max(10), Validators.min(0)]);
    this.gfaBandwidthLimit = new FormControl(this.field.gfaBandwidthLimit, [Validators.required, Validators.max(5000), Validators.min(0)]);
    this.vSpaceLimit = new FormControl(this.field.vSpaceLimit, [Validators.required, Validators.max(5000), Validators.min(0)]);

    this.fieldForm = new FormGroup({
    connections: this.connections,
    gfaBandwidthLimit : this.gfaBandwidthLimit,
    vSpaceLimit: this.vSpaceLimit
    });
    this.subscriptions.push(interval(3000).subscribe(() => this.getFields()));
    this.setCurrentUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }

  cancel(): void {
    this.showFieldForm = false;
    this.showStatus = true;
  }

  saveField(formValues): void {
    this.hyperFluxService.saveField(this.field.id, formValues).subscribe((data) => {
      this.showStatus = true;
      this.showFieldForm = false;
    },
    error => {
      console.error(error);
    });
  }

  showForm(): void{
    this.showFieldForm = true;
    this.showStatus = false;
  }

  setCurrentUser(): void{
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.owner = this.isOwner();
    this.teamId = this.currentUser.team;
  }

  isOwner(): boolean{
    return this.currentUser.role === 'OWNER';
  }

  private calculatePercentage(usage: number, limit: number): number {
    return Math.round(usage * 100 / limit );
  }

  private getFields(): void{
    this.subscriptions.push(this.hyperFluxService.getFields().subscribe(data =>  {
      this.field = data[0] as IField;
    }));
 }
}
