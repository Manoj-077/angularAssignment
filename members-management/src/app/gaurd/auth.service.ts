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
    sessionStorage.setItem('isLoggedIn','true')
    this.router.navigate(['main/home'])
  }
  logout(){
    this.loggedIn = false;
    sessionStorage.clear();
  }
  log(){
    return this.loggedIn;
  }
}
