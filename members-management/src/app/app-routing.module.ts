import { compileClassMetadata } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './gaurd/auth.guard';
import { AdminGuard } from './gaurd/admin.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login-page/login.component';
import { MainComponent } from './main-page/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RolesComponent } from './roles-page/roles.component';

import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list-page/user-list.component';

const routes: Routes = [
  {path : "" , redirectTo : "login", pathMatch: 'full'},
  {path : "login", component : LoginComponent},
  
  {
    path: "main", component : MainComponent,
  canActivate: [AuthGuard],
   children: [
    {path:"home",component: HomePageComponent},
    {path: "userList", component : UserListComponent},
    {path:"userDetails", component: UserDetailsPageComponent , canActivate:[AdminGuard]} ,
    {path:"userEdit",component: UserEditComponent,  canActivate:[AdminGuard]},
    {path:"userProfile",component: ProfilePageComponent},
    {path : "roles", component : RolesComponent,canActivate:[AdminGuard]}
  ]},
   {path: "**", component: PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
