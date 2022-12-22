import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @ViewChild('popup') pop :ElementRef;
  @ViewChild('username') username : ElementRef;
  loggedUser : string;
  userExist : boolean =false;
  users : any
  user: any;
  roles : any;
  name : any;
  constructor(private http: HttpClient, private router: Router, private userService : UserService){
   
  }
  
  ngOnInit(): void {
    this.roles = localStorage.getItem('roles');
    this.roles = JSON.parse(this.roles)
    // this.userService.loggedIn.subscribe((data)=>{
    //   this.name = data
    //   console.log(this.name)
    // }
    // )
  }

  openPop(){
    this.pop.nativeElement.style.visibility = 'visible';
  }
  closePopup(){
    this.pop.nativeElement.style.visibility = 'hidden';
  }
  addUser(){
    this.http.get("http://localhost:3000/users").subscribe((data)=>{
      this.users = data;
      for (let i=0;i< this.users.length;i++){
        if(this.users[i].username === this.username.nativeElement.value){
          this.userExist = true
          break
        }
      }
      if(this.userExist === false){
      this.router.navigate(['/main/userDetails'])
      }
      else{
        this.userExist=true;
        this.closePopup();
        setTimeout(()=>{
          this.userExist = false;
          this.router.navigate(['/main/userList'])
        }, 2000)
        
      }
      
      // this.user = this.users.find((o:any)=>{o.username === this.username.nativeElement.value})
      // console.log(this.user)
    }
    )
    
  }
}
