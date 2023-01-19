import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../gaurd/auth.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  {
  date:Date = new Date();
  d: any;
  checked: boolean;
  username : any = "";
  role : any ="";
  ITOuser : any = false;
  userLogo : any = "";
  userData: any = "";
  firstname : any = "";
  lastname : any = "";
  constructor(private authService: AuthService, private router : Router, private userService : UserService,
    private http: HttpClient){
    
  }
  inbuiltDate : Date; 
  ngOnInit(){
    console.log(this.ITOuser)
    this.username = localStorage.getItem('username');
    this.timeUpdate();
  
    this.userService.getUsers().subscribe((data)=>{
      this.userData = data;
      for (let i=0;i<this.userData.length;i++){
        if(this.username === this.userData[i].username){
          this.userData = this.userData[i];
          this.userLogo = this.userData.image;
          this.firstname = this.userData.firstname;
          this.lastname = this.userData.lastname;

        }
      }
    })
    setTimeout(()=>{
      this.role = localStorage.getItem('roles');
      this.role = JSON.parse(this.role)
      console.log(this.role)
      // this.router.navigate(['main/home'])
    },100)
  }
  dis(){
    console.log(this.checked)
  }
  timeUpdate(){
    setInterval(()=>{
      this.inbuiltDate = new Date();
    },1000)
  }
  
 logout(){
  this.userService.logDelete();
  this.authService.logout();
  this.router.navigate([''])
 }
 
}
