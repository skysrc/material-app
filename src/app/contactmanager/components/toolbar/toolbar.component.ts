import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  /**
   *
   */
  constructor(private diaglog: MatDialog) {

  }
  ngOnInit() {

  }

  openAddContactDialog(): void {
    let dialogRef = this.diaglog.open(NewContactDialogComponent, {
      width: '450px'
    });

    // subscribe to dialog closed event
    dialogRef.afterClosed().subscribe(result => {
      console.log('This dialog was closed', result);
    });
  }

}
