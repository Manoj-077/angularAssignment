import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main-page/main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserListComponent } from './user-list-page/user-list.component';
import { RolesComponent } from './roles-page/roles.component';
import { LoginComponent } from './login-page/login.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    UserListComponent,
    RolesComponent,
    LoginComponent,
    SignupPageComponent,
    UserDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
