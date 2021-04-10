import { Routes } from '@angular/router';

import { RegistrationComponent } from '../app/user/registration/registration.component';
import { LoginComponent } from '../app/user/login/login.component';
import { FieldListComponent } from './hyperFluxResource/fields/field-list.component';
import { HasValidToken } from '../app/has-valid-token.service';
import { FieldListResolver } from '../app/hyperFluxResource/field-list-resolver.service';

export const appRoutes: Routes = [
  { path: '', component: RegistrationComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'fields', component: FieldListComponent, canActivate: [HasValidToken], resolve: { fields: FieldListResolver }}
];
