import { Component } from '@angular/core';
import { applicationName } from './core/static/application-name';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: []
})
export class AppComponent {
  
  public title: string = applicationName;
}
