import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserDetail } from '../shared/userDetail.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import {MultiSelectFilterOptions} from 'primeng/multiselect';
import { AutoLogoutService } from '../services/auto-logout.service';
import { BnNgIdleService } from 'bn-ng-idle';

interface Roles {
  name: string,
  code: string
}

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent implements OnInit {


  @ViewChild('img') inputImage : ElementRef;
  gnder : any ="";
  user : any;
  pass: any = ""
  editMode : boolean = false;
  description : any;
  passwordregexfail : boolean = false;
  image = 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg';
  nonImage : boolean = false;
  createdTime : Date = new Date()
  roles: Roles[];
  selectedRolesCode: any = "";
 
  fn : any = ""
 
  emailId : any = "";
 
  phnNum : any = "";

  addres:any=""

  selectedStatus : any = "";

  confirmpass : any = "";
  
  lastname : any = "";
 
  
  bdayDate : any = "";
  bdayFail:any = false;
  timezone : any;
  locale : any;
  zipcode : any;
  cntry : any;
  state : any;
  submitted : any = false;
  zipcodePattern : any = "^[0-9]+$";
  phoneNumberPattern: any = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
  lastnamePattern: any = '^[a-zA-Z\s]+$';
  firstnamePattern : any = '^[a-zA-Z\s]+$';
  emailPattern : any = '^[a-z0-9]+@[a-z]+\.com$';
  passwordPattern : any = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$';
  // ig:any;
  constructor(private title: Title, private http:HttpClient, private router : Router, private userService: UserService,
    private autoLogoutService: AutoLogoutService, private bnIdle:BnNgIdleService) {
    this.roles = [
      {name: 'Admin', code: 'Admin'},
      {name: 'ITOuser', code: 'ITOuser'},
        ];
  }

  x = this.autoLogoutService.logoutTime;
  ngOnInit() {
    this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
      if(isTimedOut){
      this.autoLogoutService.logout() 
      }
    });

    this.user = localStorage.getItem('newUser')
    this.description = localStorage.getItem('description')
    this.userService.editMode.subscribe((data)=>{
      if(data === true){
        this.editMode = true;
        console.log(this.editMode)
      }
      else{
        this.editMode = false;
      }
    }
    )
  }
  

  validateBday(){
    const thisYear = new Date();
    let bdayYear = this.bdayDate.slice(0,4) 
    if(bdayYear>=thisYear.getFullYear()){
    this.bdayFail = true;
    }else{
      this.bdayFail = false;
    }
  }

  selectedCities: string[] = [];
  checked: boolean = false;
  selectedCountry: String = "--Choose Country--";
	Countries: Array<any> = [
		{ name: 'USA', states: ['New York','California','Arizona' ] },
		{ name: 'India', states: ['Delhi','Karnataka', 'Maharashtra' ] },
	];


	states: Array<any> = []; 
	cities: Array<any> = []; 
	changeCountry(country: any) { 
		this.states = this.Countries.find((cntry: any) => cntry.name == country.target.value).states;
	}

  userData = {
    username : "",
    firstname : "",
    lastname : "",
    email : "",
    country : "",
    state : "",
    mobile : "",
    status : ""  ,
    birthday:"",
    address : "",
    zipcode:"",
    timezone : "",
    locale:"",
    gender : "",
    roles : "",
    image : "" , 
    password: "",
    description:"",
    createdTime: "" 
  }
 
  change(){
    this.submitted = false;
  }

  onSubmit(f:NgForm){
     console.log(f)
      this.validateBday();
      this.submitted = true;
      if(!this.bdayFail && f.valid){
        this.userData.username = this.user;
        this.userData.birthday = this.bdayDate;
        this.userData.image = this.image;
        this.userData.createdTime = this.createdTime.toString();
        this.userService.addUser(this.userData).subscribe((data)=>{})
        this.router.navigate(['main/userList'])
        setTimeout(()=>{
          this.userService.userCreated.next(true);
        },2000)
      }

      
      
  }
 onCancel(){
  
   this.router.navigate(['main/userList']);
   
  //  this.form.reset();
 }
 
 onfileselected(event:any){
  console.log(event.target.files[0].size)
  if((event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg") && event.target.files[0].size< 2000000){
    var reader = new FileReader()
  reader.readAsDataURL(event.target.files[0])
  reader.onload = (event:any)=> {
    this.image = event.target.result;
    }
    this.nonImage = false;
  }
  else{
    this.nonImage = true
    this.inputImage.nativeElement.value = "";
    setTimeout(()=>{
      this.nonImage = false;
    },3000)
  }
 
  }

  autologout(){
    this.autoLogoutService.logout()
  }
	ngOnDestroy(){
    this.bnIdle.stopTimer();
    console.log('destroyed adduser')
  }
}
