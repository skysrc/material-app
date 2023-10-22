import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  constructor(
    private diaglog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {

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

      if (result) {
        this.openSnackBar("Contact added", "Navigate")
          .onAction().subscribe(() => {
            //navigate
            this.router.navigate(['/contactmanager', result.id]);
          });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
