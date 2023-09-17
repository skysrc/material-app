import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  template: `
    <app-sidenav></app-sidenav>

  `,
  styles: [
  ]
})
export class ContactmanagerAppComponent {

  constructor(iconRegistry: MatIconRegistry, sanitzer: DomSanitizer) {
    // we can add single but our asset file contains several icons
    iconRegistry.addSvgIconSet(
      sanitzer.bypassSecurityTrustResourceUrl('assets/avatars.svg'));
  }

}
