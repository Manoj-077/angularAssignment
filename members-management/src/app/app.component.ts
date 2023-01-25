import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { AutoLogoutService } from './services/auto-logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'members-management';
  constructor(
    private bnIdle: BnNgIdleService,
    private autoLogoutService: AutoLogoutService
  ) {}
  ngOnInit() {}
}
