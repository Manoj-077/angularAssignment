import { Component } from '@angular/core';
import { AutoLogoutService } from '../services/auto-logout.service';
import { BnNgIdleModule, BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private autoLogoutService : AutoLogoutService, private bnIdle: BnNgIdleService){

  }
  // x = this.autoLogoutService.logoutTime;
  // ngOnInit(){
  //   this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
  //      this.autoLogoutService.logout()  
  //     });
  // }
  // ngOnDestroy(){
  //   this.bnIdle.stopTimer();
  //   console.log('destroyed home c')
  // }
 
}
