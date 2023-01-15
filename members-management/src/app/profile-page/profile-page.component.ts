import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoLogoutService } from '../services/auto-logout.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  loggedInUserInfo: any = "";
  allUsers:any;
  username : any;
  userImage :any;
  roles: any ="";
  constructor(private http: HttpClient, private autoLogoutService: AutoLogoutService,
     private bnIdle:BnNgIdleService, private userService:UserService){

  }
  x = this.autoLogoutService.logoutTime;
  ngOnInit() {
    this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
      if(isTimedOut){
      this.autoLogoutService.logout() 
      }
    });

    this.username = localStorage.getItem('username');
    this.roles = localStorage.getItem('roles');
    this.roles = JSON.parse(this.roles)
    this.userService.getUsers().subscribe((data)=>{
      this.allUsers = data;
      for(let i=1;i<this.allUsers.length;i++){
        if(this.allUsers[i].username === this.username){
          this.loggedInUserInfo = this.allUsers[i];
          
          break;
          }
        }
      this.userImage = this.loggedInUserInfo.image;
      console.log(this.loggedInUserInfo)
      console.log(this.roles)
    })

    // this.http.get('http://localhost:3000/users').subscribe((data)=>{
    //   this.allUsers = data;
    //   for(let i=1;i<this.allUsers.length;i++){
    //     if(this.allUsers[i].username === this.username){
    //       this.loggedInUserInfo = this.allUsers[i];
          
    //       break;
    //       }
    //     }
    //   this.userImage = this.loggedInUserInfo.image;
    //   console.log(this.loggedInUserInfo)
    //   console.log(this.roles)
    // })
  }
  ngOnDestroy(){
    this.bnIdle.stopTimer();
    console.log('destroyed profile')
  }  

}
