import { Injectable } from '@angular/core';
import { AuthService } from '../gaurd/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  constructor(private authService: AuthService, private router:Router) { }

  logout(){
    setTimeout(()=>{
      this.authService.logout();
      this.router.navigate(['login'])
    },10000)
  }
}
