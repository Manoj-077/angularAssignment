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
  constructor(private authService: AuthService, private router : Router, private userService : UserService){
    
  }
  ngOnInit(){
    console.log(this.ITOuser)
    this.username = localStorage.getItem('username');
    this.timeUpdate();
    
    
    // if(this.role === 'ITOuser'){
    //   this.ITOuser = true;
    //   console.log(this.ITOuser)
    // }
    setTimeout(()=>{
      this.role = localStorage.getItem('roles');
      this.role = JSON.parse(this.role)
      console.log(this.role)
      this.router.navigate(['main/home'])
    },100)
  }
  dis(){
    console.log(this.checked)
  }
  
  timeUpdate(){
    setInterval(()=>{
      this.date = new Date();
      this.d = this.date.toString();
    },1000)
  }
 logout(){
  this.userService.logDelete();
  this.authService.logout();
  this.router.navigate([''])
 }
 
}
