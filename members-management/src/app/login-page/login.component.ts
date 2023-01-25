import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../gaurd/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usernameCheck: boolean = false;
  passwordCheck: boolean = false;
  usersArr: any;
  showalert: boolean = false;
  enteredUsername: string = '';
  enteredPassword: string = '';
  usernameFail: any = false;
  passwordFail: any = false;
  usernameEmpty: any = false;
  passwordEmpty: any = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private userService: UserService,
    private messageService: MessageService
  ) {}
  noUserFound() {
    this.messageService.add({
      severity: 'error',
      summary: 'Invalid !',
      detail: 'Inputs NOT FOUND!',
    });
  }
  noInput() {
    this.messageService.add({
      severity: 'error',
      summary: 'Invalid !',
      detail: 'Username or Password cannot be empty',
    });
  }

  login() {
    if (this.enteredUsername === '' && this.enteredPassword !== '') {
      this.usernameEmpty = true;
      this.passwordEmpty = false;
    } else if (this.enteredPassword === '' && this.enteredUsername !== '') {
      this.passwordEmpty = true;
      this.usernameEmpty = false;
    } else if (this.enteredUsername === '' && this.enteredPassword === '') {
      this.usernameEmpty = true;
      this.passwordEmpty = true;
    } else {
      this.userService.getUsers().subscribe((data) => {
        this.usersArr = data;
        for (let i = 0; i < this.usersArr.length; i++) {
          if (
            this.usersArr[i].username === this.enteredUsername &&
            this.usersArr[i].password === this.enteredPassword
          ) {
            this.usernameCheck = true;
            this.passwordCheck = true;
          }
        }
        if (this.usernameCheck && this.passwordCheck) {
          this.usernameEmpty = false;
          this.passwordEmpty = false;
          this.authService.login();
          this.userService.logSave(this.enteredUsername);
          this.userService.rolesSave();
        } else {
          this.noUserFound();
        }
      });
    }
  }
}
