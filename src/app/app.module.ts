import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HyperfluxComponent } from './hyperflux-app.component';
import { HeaderComponent } from './nav/header/header.component';
import {  HasValidToken } from './hasValidToken.service';
import { appRoutes } from './routes';

import {
  RegistrationComponent,
  AuthenticationService
 } from './user/index';
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
    LoginComponent
  ],
  providers: [AuthenticationService, HasValidToken],
  bootstrap: [HyperfluxComponent]
})
export class AppModule { }
