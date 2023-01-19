import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  logStatus: boolean = false;
  isLoggedIn : any ;
  constructor(private authService : AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this.logStatus = this.authService.log()
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn')
    this.isLoggedIn = JSON.parse(this.isLoggedIn);
    if(this.isLoggedIn){
      return true;
      
    }
    else{
      this.router.navigate([''])
      return false;
    }
  }
  
}
