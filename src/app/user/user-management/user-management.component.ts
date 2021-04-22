import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { HyperFluxService } from '../../hyperFluxResource/shared/hyper-flux-service';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircle,  faTrash, faPen, faAngleDoubleLeft, faAngleDoubleRight, faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import { ITeam, IUser } from '../user.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';

export enum UserRole {
  Member = 'MEMBER',
  Owner = 'OWNER',
}
@Component({
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {
  faCircle = faCircle;
  faTrash = faTrash;
  faPencil = faPen;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  users: IUser[];
  currentUser: IUser;
  team: ITeam;
  owner: boolean;
  userRole = UserRole;
  userForm: FormGroup;
  displayName: FormControl;
  email: FormControl;
  teamName: FormControl;
  role: FormControl;
  showUserForm = false;
  showOnlyTable = true;
  user: IUser;
  teamId: number;
  fieldId: number;
  closeResult: string;

  page = 1;
  pageSize = 10;
  collectionSize: number;


  constructor(private hyperFluxService: HyperFluxService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal ) {

  }

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.teamId  = params.id;
      this.fieldId = params.fieldId;
    });

    if (this.teamId ) {
      const joinedWithObject = forkJoin({
        team: this.hyperFluxService.getTeam(this.teamId),
        users: this.hyperFluxService.getUsers(this.teamId),
      });

      joinedWithObject.subscribe(data => {
          this.team = data.team;
          if (this.team){
            this.team.users = data.users;
            this.collectionSize = this.team.users.length;
          }
      },
      error => {
        console.error(error);
      });
    }

    this.setCurrentUser();
  }

  cancel(): void {
    this.showOnlyTable = true;
    this.showUserForm = false;
  }

  editUser(user): void{
    this.user = user;
    this.displayName = new FormControl(this.user.displayName, [Validators.required, Validators.maxLength(15), Validators.minLength(4)]);
    this.email = new FormControl(this.user.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
    this.role = new FormControl(this.user.role, [Validators.required]);
    this.teamName = new FormControl(this.team.name, [Validators.required, Validators.maxLength(15), Validators.minLength(4)]);

    this.userForm = new FormGroup({
      user: new FormGroup({
        displayName: this.displayName,
        email: this.email,
        role: this.role,
      }),
      team: new FormGroup({
        name: this.teamName,
      }),
    });

    this.showOnlyTable = false;
    this.showUserForm = true;
  }

  deleteUser(userId: number): void {
    this.hyperFluxService.deleteUser(userId).subscribe((response) => {
      if (this.currentUser.id === userId) {
        this.router.navigate(['login']);
      } else {
        this.ngOnInit();
      }
    });
  }

  open(content: string, user: IUser): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteUser(user.id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveUser(formValue): void {
     const id = this.user.id;

     this.hyperFluxService.saveUser(id, formValue.user).subscribe( data => {
      this.showOnlyTable = true;
      this.showUserForm = false;
      this.ngOnInit();
     },
     error => {
      console.error(error);
     });
   }

   setCurrentUser(): void{
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.owner = this.isOwner();
  }

  isOwner(): boolean{
    return this.currentUser.role === 'OWNER';
  }

  refreshUsers(): void {
    this.users
      .map((user, i) => ({id: i + 1, ...user}))
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
