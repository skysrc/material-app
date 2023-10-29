import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isScreenSmall: boolean = false;
  users!: Observable<User[]>;
  isDarkTheme: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {

  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  ngOnInit(): void {
    this.breakpointObserver
      // .observer([Breakpoints.XSmall])
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.users = this.userService.users;
    this.userService.loadAll();

    // can be comment out as it's handled on main-content component.
    // this.users.subscribe(data => {
    //   // console.log(data);
    //   // to solve problem of 1st time loading where we will default to 
    //   // the 1st item in the list
    //   if (data.length > 0) this.router.navigate(['/contactmanager', data[0].id]);
    // });

    //router exposes event as an observables
    // we wanna know about it whenever it's routing
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        // close our sideNav
        // to reference to our sideNav, we use ViewChild attribute to resolve the sideNav
        this.sidenav.close();
      }

    });
  }

}
