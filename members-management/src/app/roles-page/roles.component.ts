import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoFocusModule } from 'primeng/autofocus';
import { AutoLogoutService } from '../services/auto-logout.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

fetchedData: any; 

constructor(private http:HttpClient, private autoLogoutService: AutoLogoutService, 
  private bnIdle: BnNgIdleService, private userService:UserService){

 } 
 x = this.autoLogoutService.logoutTime;
ngOnInit(){
  this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
      
    if(isTimedOut){
    
    this.autoLogoutService.logout() 
    }
  });

  this.userService.getRoles().subscribe((data)=>{
    this.fetchedData = data;
    this.fetchedData = this.fetchedData.slice(1)
  })

  // this.http.get("http://localhost:3000/roles").subscribe((data)=>{
  //   this.fetchedData = data;
  //   this.fetchedData = this.fetchedData.slice(1)
  // })
}

ngOnDestroy(){
  this.bnIdle.stopTimer();
  console.log('destroyed roles')
}


}
