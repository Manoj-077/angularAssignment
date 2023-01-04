import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoLogoutService } from '../services/auto-logout.service';

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
  constructor(private http: HttpClient, private autoLogoutService: AutoLogoutService){

  }
  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.roles = localStorage.getItem('roles');
    this.roles = JSON.parse(this.roles)
    this.http.get('http://localhost:3000/users').subscribe((data)=>{
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
  }
  autologout(){
    this.autoLogoutService.logout()
  }
}
