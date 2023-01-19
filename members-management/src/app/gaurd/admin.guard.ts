import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  loggedinUserRole : any;
  constructor(private router : Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      this.loggedinUserRole = localStorage.getItem('roles');
      this.loggedinUserRole = JSON.parse(this.loggedinUserRole);

      if(this.loggedinUserRole === 'Admin'){
        return true;
      }
      else{
        this.router.navigate(['main/home']);
        return false;
      }
   
  }
  
}
