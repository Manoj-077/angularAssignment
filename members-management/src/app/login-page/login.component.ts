import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../gaurd/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') formData : NgForm ;
  usernameCheck : boolean =false
  passwordCheck : boolean = false;
  usersArr : any;
  showalert : boolean = false;
  enteredUsername : string;
  enteredPassword : string;
 
  
   constructor(private router : Router,private authService : AuthService, private http : HttpClient, private userService : UserService){

   }

    login(){
      
      this.http.get("http://localhost:3000/users").subscribe((data)=>{ 
        this.usersArr = data;
        this.enteredUsername = this.formData.value.username;
        this.enteredPassword = this.formData.value.password
        for (let i=0;i< this.usersArr.length;i++){
        if(this.usersArr[i].username === this.enteredUsername && this.usersArr[i].password === this.enteredPassword ){
          this.usernameCheck = true;
          this.passwordCheck = true
        }
      }
      if(this.usernameCheck && this.passwordCheck){
      // this.userService.loggedIn.next(this.enteredUsername);
      this.authService.login();
      this.userService.logSave(this.enteredUsername)
      this.userService.roles()
      // this.userService.loggedIn.next(this.userService.roles())
      }else{
        this.showalert = true;
        this.formData.reset()
        setTimeout(()=>{this.showalert=false; this.router.navigate([''])},2000)
      }
      })
      
    }
}
