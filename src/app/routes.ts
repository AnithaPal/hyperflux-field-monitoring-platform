import { Routes } from '@angular/router';

import { RegistrationComponent } from '../app/user/registration/registration.component';
import { LoginComponent } from '../app/user/login/login.component';
import { FieldListComponent } from './hyperFluxResource/fields/field-list.component';
import { HasValidToken } from '../app/has-valid-token.service';
import { FieldListResolver } from '../app/hyperFluxResource/field-list-resolver.service';
import { RelayListComponent } from '../app/hyperFluxResource/relays/relay-list.component';
import { UserManagementComponent } from '../app/user/user-management/user-management.component';
import { ValidUser } from './user';

export const appRoutes: Routes = [
  { path: '', component: RegistrationComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'fields', component: FieldListComponent, canActivate: [HasValidToken], resolve: { fields: FieldListResolver }},
  { path: 'fields/:id/relays', component: RelayListComponent, canActivate: [HasValidToken] },
  { path: 'teams/:id/users', component: UserManagementComponent, canActivate: [HasValidToken, ValidUser] }
];
