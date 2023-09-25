import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  user!: User | null;
  constructor(
    private route: ActivatedRoute,
    private service: UserService) {

  }
  ngOnInit(): void {
    // Subscribe to the params observables
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      this.user = null; // just to trigger the spinner to show and dissappear again.
      // to solve racing issue when users hasn't been loaded but 
      // we already wanna get user from here. So add get userById into
      // subscribe method for usres observables
      this.service.users.subscribe(users => {
        if (users.length == 0) return;
        // only for test purposes, where we wanna emulate it took longer.
        setTimeout(() => {
          this.user = this.service.userById(id);

        }, 500);
      });
    });
  }

}
