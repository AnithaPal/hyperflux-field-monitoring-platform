import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HyperfluxComponent } from './hyperflux-app.component';

import {  HasValidToken } from './has-valid-token.service';
import { appRoutes } from './routes';

import {
  RegistrationComponent,
  AuthenticationService,
  LoginComponent,
  UserManagementComponent,
  ValidUser
 } from './user/index';

import {
   HeaderComponent,
   SidebarComponent,
   HyperfluxHeaderComponent
  } from './nav/index';

import { Error404Component } from '../app/common/errors/404.component';

import {
  FieldListComponent,
  HyperFluxService,
  FieldListResolver,
  FieldStabilityStatusPipe,
  EncabulationRatePipe,
  GfaBandwidthUsagePipe,
  GfaBandwidthLimitPipe,
  VSpaceLimitPipe,
  VSpaceUsagePipe,
  RelayComponent,
  RelayListComponent
 } from '../app/hyperFluxResource/index';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    HyperfluxComponent,
    RegistrationComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    HyperfluxComponent,
    FieldListComponent,
    FieldStabilityStatusPipe,
    EncabulationRatePipe,
    GfaBandwidthUsagePipe,
    GfaBandwidthLimitPipe,
    VSpaceLimitPipe,
    VSpaceUsagePipe,
    RelayComponent,
    RelayListComponent,
    UserManagementComponent,
    HyperfluxHeaderComponent,
    Error404Component
  ],
  providers: [
    AuthenticationService,
    HasValidToken,
    HyperFluxService,
    FieldListResolver,
    ValidUser
   ],
  bootstrap: [HyperfluxComponent]
})
export class AppModule { }
