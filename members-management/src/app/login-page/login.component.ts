import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../gaurd/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';
import { identifierName } from '@angular/compiler';

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
  usernameFail: any = false;
  passwordFail : any = false;
  
   constructor(private router : Router,private authService : AuthService, private http : HttpClient, 
    private userService : UserService, private messageService: MessageService){

   }
   noUserFound() {
    this.messageService.add({severity:'error', summary:'Invalid !', detail:'Inputs NOT FOUND!'});
  }
    noInput() {
      this.messageService.add({severity:'error', summary:'Invalid !', detail:'Username or Password cannot be empty'});
    }

    login(){
      
      
      if(this.formData.value.username ==="" || this.formData.value.password ===""){
        this.noInput();
        
      }
      else
        {   
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
            this.userService.rolesSave()
            // this.userService.loggedIn.next(this.userService.roles())
            }else{
              // this.showalert = true;
              // this.formData.reset()
              this.noUserFound();
              // setTimeout(()=>{this.showalert=false; this.router.navigate([''])},2000)
            }
          })
        }
     
      
    }
}
