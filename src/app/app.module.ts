import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HyperfluxComponent } from './hyperflux-app.component';
import { RegistrationComponent } from './user/registration/registration.component';

@NgModule({
  declarations: [
    HyperfluxComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [HyperfluxComponent]
})
export class AppModule { }
