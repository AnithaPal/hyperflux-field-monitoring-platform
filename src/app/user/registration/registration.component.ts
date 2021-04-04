import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  styles: [`
  .login-form { background-color: #1e1e20}
  input {
    width: 329px;
    height: 41px;
    padding: 10px 8px 9px;
    border-radius: 5px;
    border: solid 1px #606060;
    background-color: rgba(196, 196, 196, 0);

  }
  label {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #cccccc;
  }

  input:disabled input {
    border: solid 1px rgba(96, 96, 96, 0.5);
  }

  input:focus {
    background-color: $primary-color;
  }

  input[type=text] {
    letter-spacing: normal;
    text-align: left;
    color: #cccccc;
}

  .Inner-Text {
    width: 313px;
    height: 22px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #cccccc;
  }
   em {color: #E05C65; padding-left: 2px;}
  .error input, .error select, .error textarea { background-color: #E3C3C5;}
  .error ::-webkit-input-placeholder { color: #999;}
  .error ::-moz-placeholder { color: #999; }
  .error :-moz-placeholder { color: #999; }
  .error :ms-input-placeholder { color: #999;}
`]
})

export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  displayName: FormControl;
  email: FormControl;
  company: FormControl;
  password: FormControl;

  ngOnInit(): void {
    this.displayName = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]);
    this.email = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.company = new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.registrationForm = new FormGroup({
      displayName: this.displayName,
      email: this.email,
      company: this.company,
      password: this.password
    });
  }

  register(formValues) :void{

    console.log("displayName " + formValues.displayName);
    console.log("email" + formValues.email);
  }


}
