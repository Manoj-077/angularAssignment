import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoLogoutService } from '../services/auto-logout.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  loggedInUserInfo: any = '';
  allUsers: any;
  username: any;
  userImage: any;
  roles: any = '';
  logoutTime: any;
  constructor(
    private http: HttpClient,
    private autoLogoutService: AutoLogoutService,
    private bnIdle: BnNgIdleService,
    private userService: UserService
  ) {
    this.logoutTime = this.autoLogoutService.logoutTime;
  }

  ngOnInit() {
    this.bnIdle
      .startWatching(this.logoutTime)
      .subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.autoLogoutService.logout();
        }
      });

    this.username = localStorage.getItem('username');
    this.roles = localStorage.getItem('roles');
    this.roles = JSON.parse(this.roles);
    this.userService.getUsers().subscribe((data) => {
      this.allUsers = data;
      for (let i = 1; i < this.allUsers.length; i++) {
        if (this.allUsers[i].username === this.username) {
          this.loggedInUserInfo = this.allUsers[i];

          break;
        }
      }
      this.userImage = this.loggedInUserInfo.image;

    });
  }
  ngOnDestroy() {
    this.bnIdle.stopTimer();
    
  }
}
