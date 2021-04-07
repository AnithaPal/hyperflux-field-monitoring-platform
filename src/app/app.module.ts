import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { HyperfluxComponent } from './hyperflux-app.component';
import { HeaderComponent } from './nav/header/header.component';
import { appRoutes } from './routes';

import {
  RegistrationComponent,
  AuthenticationService
 } from './user/index';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    HyperfluxComponent,
    RegistrationComponent,
    HeaderComponent
  ],
  providers: [AuthenticationService],
  bootstrap: [HyperfluxComponent]
})
export class AppModule { }
