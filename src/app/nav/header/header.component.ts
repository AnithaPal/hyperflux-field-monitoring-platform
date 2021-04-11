import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
   styles: [`
   .navbar-custom {
       background-color: #1e1e20 !important;
   }
    a {
      color: $text-color;
      text-decoration: underline;
    }
`]
})

export class HeaderComponent {
  faCircle = faCircle;

}
