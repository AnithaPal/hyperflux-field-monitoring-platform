import { Routes } from '@angular/router';

import { RegistrationComponent } from '../app/user/registration/registration.component';
import { LoginComponent } from '../app/user/login/login.component';

export const appRoutes: Routes = [
  { path: '', component: RegistrationComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent}
];
