import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { HyperFluxService } from '../../hyperFluxResource/shared/hyper-flux-service';
import { faCircle,  faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../user.model';


@Component({
  templateUrl: './user-management.component.html',
   styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {
  faCircle = faCircle;
  faTrash = faTrash;
  faPencil = faPen;
  hideSideNav = false;
  dataSource: IUser[];
  displayedColumns: string[] = ['displayName', 'email', 'team', 'role', 'action'];
  constructor(private hyperFluxService: HyperFluxService ) {

  }
  ngOnInit(): void{
    this.getusers();
  }

  getusers(): void{
    this.hyperFluxService.getUsers().subscribe( data => {
      // debugger
      this.dataSource = data;

    }, error => {
      console.error(error);
    });
  }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }
}
