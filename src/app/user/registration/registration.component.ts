import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { HeaderComponent } from '../../nav/header/header.component';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  displayName: FormControl;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  errorMessage: string;

  constructor(private auth: AuthenticationService){

  }

  ngOnInit(): void {
    this.displayName = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.name = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.registrationForm = new FormGroup({
      team: new FormGroup({
        name: this.name,
      }),
      user: new FormGroup({
        displayName: this.displayName,
        email: this.email,
        password: this.password
      })
    });
  }

  registerUser(formValues) :void{

    console.log(formValues);
    this.auth.registerUser(formValues).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
        if(error.error.message) {
          this.errorMessage = error.error.message;
        }
      },
      () => {
        // this.invalidRegister = false;
        // this.router.navigate(['login']);
      })
  }


}
