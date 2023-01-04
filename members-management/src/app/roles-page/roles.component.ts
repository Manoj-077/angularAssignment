import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoFocusModule } from 'primeng/autofocus';
import { AutoLogoutService } from '../services/auto-logout.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {

fetchedData: any; 

constructor(private http:HttpClient, private autoLogoutService: AutoLogoutService){

 } 

ngOnInit(){
  this.http.get("http://localhost:3000/users").subscribe((data)=>{
    this.fetchedData = data;
    this.fetchedData = this.fetchedData.slice(1)
  })
}
autologout(){
  this.autoLogoutService.logout()
}

}
