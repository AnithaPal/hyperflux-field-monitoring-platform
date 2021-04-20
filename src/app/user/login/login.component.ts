import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IUser, ITeam } from '../user.model';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  errorMessage: string;
  successMessage: string;
  securityToken: string;
  securityExpiration: Date;
  team: ITeam;
  currentUser: IUser;

  constructor(private auth: AuthenticationService, private router: Router){
    this.successMessage = this.router.getCurrentNavigation().extras.state?.message;
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.loginForm = new FormGroup({
        email: this.email,
        password: this.password
    });
  }

  loginUser(formValues: { email: string; password: string }): void{
    this.successMessage = '';
    this.auth.loginUser(formValues).subscribe(
      data => {
        this.currentUser =  data as IUser;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.securityToken = data.securityToken;
        this.securityExpiration = data.securityTokenExpiration;
        this.team = data.team as ITeam;
        this.router.navigate(['fields']);

      },
      error => {
        console.error(error);
        if (error.error.message ) {
          this.errorMessage = error.error.message;
        }
        else if (error.statusText === 'Not Found'){
          this.errorMessage = 'User not found in the system. Please register';
        }
      });
  }
}

