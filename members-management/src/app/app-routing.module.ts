import { compileClassMetadata } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurd/auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login-page/login.component';
import { MainComponent } from './main-page/main.component';
import { RolesComponent } from './roles-page/roles.component';

import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list-page/user-list.component';

const routes: Routes = [
  {path : "" , redirectTo : "login", pathMatch: 'full'},
  {path : "login", component : LoginComponent},
  
  {path: "main", component : MainComponent,canActivate: [AuthGuard],
   children: [
    {path:"home",component: HomePageComponent},
    {path: "userList", component : UserListComponent},
    {path:"userDetails", component: UserDetailsPageComponent},
    {path:"userEdit",component: UserEditComponent},
    {path : "roles", component : RolesComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
