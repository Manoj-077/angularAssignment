import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn = new Subject();
  usersData: any;
  username: any;
  role: any;
  permissions: any;
  rolesData: any;
  userEdited = new Subject();
  userCreated = new Subject();
  constructor(private http: HttpClient) {}

  logSave(username: string) {
    localStorage.setItem('username', username);
  }
  logDelete() {
    localStorage.clear();
  }
  rolesSave() {
    this.http.get('http://localhost:3000/users').subscribe((data) => {
      this.usersData = data;
      this.username = localStorage.getItem('username');
      for (let i = 0; i < this.usersData.length; i++) {
        if (this.username === this.usersData[i].username) {
          this.role = this.usersData[i].roles;
        }
      }

      localStorage.setItem('roles', JSON.stringify(this.role));
      this.http.get('http://localhost:3000/roles').subscribe((data) => {
        this.rolesData = data;        
        for (let r = 0; r < this.rolesData.length; r++) {
          if (this.role === this.rolesData[r].role) {
            this.permissions = this.rolesData[r].permissions;
          }
        }
        localStorage.setItem('permissions', JSON.stringify(this.permissions));
      });
    });
  }
  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  getRoles() {
    return this.http.get('http://localhost:3000/roles');
  }

  deleteUser(id: any) {
    return this.http.delete('http://localhost:3000/users/' + id);
  }

  addUser(userObject: any) {
    return this.http.post('http://localhost:3000/users', userObject);
  }

  editUser(id: any, userObject: any) {
    return this.http.put('http://localhost:3000/users/' + id, userObject);
  }
}
