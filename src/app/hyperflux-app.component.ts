import { Component } from '@angular/core';

@Component({
  selector: 'hyperflux-app',
  template: `<div>
                <router-outlet></router-outlet>
            </div>`,
  styleUrls: ['./hyperflux-app.component.scss']
})
export class HyperfluxComponent {
  title = 'hyperflux-field-monitoring-platform';
}
