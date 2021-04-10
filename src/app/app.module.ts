import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HyperfluxComponent } from './hyperflux-app.component';

import {  HasValidToken } from './has-valid-token.service';
import { appRoutes } from './routes';

import {
  RegistrationComponent,
  AuthenticationService
 } from './user/index';

import {
   HeaderComponent,
   SidebarComponent
  } from './nav/index';

import {
  FieldListComponent,
  HyperFluxService,
  FieldListResolver
 } from '../app/hyperFluxResource/index';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './user/login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    HyperfluxComponent,
    RegistrationComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    HyperfluxComponent,
    FieldListComponent
  ],
  providers: [
    AuthenticationService,
    HasValidToken,
    HyperFluxService,
    FieldListResolver
   ],
  bootstrap: [HyperfluxComponent]
})
export class AppModule { }
