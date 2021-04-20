import { Component } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-hyperflux-header',
  templateUrl: './hyperflux-header.component.html',
   styles: [`
   .header{
    height: 80px;
    background-color: #1e1e20;
    border-bottom: 1px solid #606060;
    width: 100%;
  }
`]
})

export class HyperfluxHeaderComponent {
  faCircle = faCircle;

}
