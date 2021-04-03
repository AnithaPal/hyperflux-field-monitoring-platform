import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HyperfluxComponent } from './hyperflux-app.component';

@NgModule({
  declarations: [
    HyperfluxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HyperfluxComponent]
})
export class AppModule { }
