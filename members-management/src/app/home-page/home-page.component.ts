import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AutoLogoutService } from '../services/auto-logout.service';
import { AuthService } from '../gaurd/auth.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  darkMode: boolean = false;
  dayMode :boolean = !this.darkMode;
  basicData: any;
  basicOptions: any;
  username: any;
  fetchedData: any;
  arr:any = [];
  currentDate: Date = new Date();
  todayDate : any;
  counts:any = {}
  constructor(private http:HttpClient, private autoLogoutService : AutoLogoutService,
    private authService : AuthService, private router:Router, private bnIdle: BnNgIdleService,
     private userService: UserService){

  }
  x = this.autoLogoutService.logoutTime;
  ngOnInit(){

    
    this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
      
      if(isTimedOut){
       
      this.autoLogoutService.logout() 
      }
    });
    // console.log('on init')
    this.username =localStorage.getItem('username');
    this.todayDate = this.currentDate;
    this.userService.getUsers().subscribe((data:any)=>{
      this.fetchedData = data;
      console.log(this.fetchedData)
      for(let i=2;i<this.fetchedData.length;i++){
        let fullDate = new Date(this.fetchedData[i].createdTime)
        let createdDate:any = fullDate;
        if(Math.round((this.todayDate - createdDate)/(1000*60*60*24))<7){
          this.arr.push(Math.round((this.todayDate - createdDate)/(1000*60*60*24))) // getting and pushing data of last 7 days
        }
      }
      this.arr = this.arr.sort((a:any, b:any) => b - a); 
      for (const num of this.arr) {
      this.counts[num] = this.counts[num] ? this.counts[num] + 1 : 1; 
      }        
      this.basicData = {
        labels: ['lastSeventhDay', 'lastSixthDay', 'lastFifthDay', 'lastFourthDay', 'lastThirdDay', 'yesterday', 'today'],
        datasets: [
                    {
                      label: 'First Dataset',
                      data: [this.counts[6], this.counts[5], this.counts[4], this.counts[3], this.counts[2], this.counts[1], this.counts[0]],
                      fill: false,
                      borderColor: '#42A5F5',
                      tension: .4
                    },
                ]
        };  
    })
      
      
  //   this.http.get("http://localhost:3000/users").subscribe((data)=>{
  //       this.fetchedData = data;
  //       for(let i=2;i<this.fetchedData.length;i++){
  //         let fullDate = new Date(this.fetchedData[i].createdTime)
  //         let createdDate:any = fullDate;
  //         if(Math.round((this.todayDate - createdDate)/(1000*60*60*24))<7){
  //             this.arr.push(Math.round((this.todayDate - createdDate)/(1000*60*60*24))) // getting and pushing data of last 7 days
  //         }
  //       }
        
  //       this.arr = this.arr.sort((a:any, b:any) => b - a); 
  //       // console.log(this.arr)
  //       for (const num of this.arr) {
  //         this.counts[num] = this.counts[num] ? this.counts[num] + 1 : 1; 
  //       }
  //       // console.log(this.counts)
  //       this.basicData = {
  //         labels: ['lastSeventhDay', 'lastSixthDay', 'lastFifthDay', 'lastFourthDay', 'lastThirdDay', 'yesterday', 'today'],
  //         datasets: [
  //             {
  //                 label: 'First Dataset',
  //                 data: [this.counts[6], this.counts[5], this.counts[4], this.counts[3], this.counts[2], this.counts[1], this.counts[0]],
  //                 fill: false,
  //                 borderColor: '#42A5F5',
  //                 tension: .4
  //             },
  //         ]
  //     };
  //  })
  }


  ngOnDestroy(){
    this.bnIdle.stopTimer();
    console.log('destroyed home c')
  }
}
