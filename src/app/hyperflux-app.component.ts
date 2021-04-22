import { Component } from '@angular/core';

@Component({
  selector: 'app-hyperflux',
  template: `<div>
                <router-outlet></router-outlet>
            </div>`,
})

export class HyperfluxComponent {
  title = 'hyperflux-field-monitoring-platform';
}
