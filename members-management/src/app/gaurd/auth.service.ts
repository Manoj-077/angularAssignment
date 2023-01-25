import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }
  loggedIn = false;
  
  login(){
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn','true')
    
    this.router.navigate(['main/home'])
  }
  logout(){
    this.loggedIn = false;
    localStorage.clear();
  }
  // log(){
  //   return this.loggedIn;
  // }
}
