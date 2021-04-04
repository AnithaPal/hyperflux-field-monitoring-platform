import { Component } from '@angular/core';

@Component({
  selector: 'hyperflux-app',
  template: `<div>
                <h1> Hyperflux </h1>
                <registration> </registration>
            </div>`,
  styleUrls: ['./hyperflux-app.component.scss']
})
export class HyperfluxComponent {
  title = 'hyperflux-field-monitoring-platform';
}
