import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn = new Subject();
  usersData:any
  username : any;
  role:any;
  editMode = new Subject();
  userCreated = new Subject();
  constructor(private http: HttpClient) { }
  logSave(username: string){
    localStorage.setItem('username',username)
  }
  logDelete(){
    localStorage.clear();
  }
  roles(){
    this.http.get("http://localhost:3000/users").subscribe((data)=>{
      this.usersData = data;
      this.username = localStorage.getItem('username');
      for(let i=0; i< this.usersData.length;i++){
        if(this.username === this.usersData[i].username){
          
          this.role= this.usersData[i].roles;
        }
      }
      // return this.role
      localStorage.setItem('roles',JSON.stringify(this.role))
    })
  }
  getUsers(){
    return this.http.get("http://localhost:3000/users").subscribe((data)=>{
      return data
    })
  }

}
