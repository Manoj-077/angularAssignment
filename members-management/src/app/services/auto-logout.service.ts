import { Injectable } from '@angular/core';
import { AuthService } from '../gaurd/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AutoLogoutService {
  logoutTime = 600;
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
