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
    this.router.navigate(['main/home'])
  }
  logout(){
    this.loggedIn = false;
  }
  log(){
    return this.loggedIn;
  }
}
