import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../gaurd/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private authService: AuthService, private router : Router, private userService : UserService){

  }
 logout(){
  this.userService.logDelete();
  this.authService.logout();
  this.router.navigate([''])
 }
}
