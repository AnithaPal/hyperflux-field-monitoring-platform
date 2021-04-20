import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { faCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
   styles: [`
   .navbar-custom {
       background-color: #1e1e20 !important;
       border-bottom: 1px solid #606060;
   }
   .navbar-nav .nav-link {
     color: #ccc;
     text-decoration: underline;
   }
`]
})

export class HeaderComponent {
  faCircle = faCircle;

}
