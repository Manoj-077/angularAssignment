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

import { HttpClientModule } from '@angular/common/http';
import { UserDetailsPageComponent } from './user-details-page/user-details-page.component';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {ButtonModule} from 'primeng/button';             
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PasswordValidatorDirective } from './shared/password-validator.directive';
import {TableModule} from 'primeng/table';
import { DatePipe } from './shared/date.pipe';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { UserEditComponent } from './user-edit/user-edit.component';


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
    UserDetailsPageComponent,
    PasswordValidatorDirective,
    DatePipe,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    CheckboxModule,
    DropdownModule,
    TableModule,
    ConfirmDialogModule,
   
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
