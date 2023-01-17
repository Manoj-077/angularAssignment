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

  // @ViewChild('f') form : NgForm;
  
  // @ViewChild('username') usrname : ElementRef;
  // @ViewChild('confirmPass') confirmpassword: ElementRef;
  // @ViewChild('confirmpassword') cnfrmPass : NgForm;
  // @ViewChild('lname') lastnameRef : NgForm;

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
  selectedRolesCodeFail : any = false;
  fn : any = ""
  firstnameFail : any = false;
  emailId : any = "";
  emailFail : any = false;
  phnNum : any = "";
  phnNumFail : any = false;
  addres:any=""
  addresFail:any= false;
  selectedStatus : any = "";
  selectedStatusFail : any = false;
  confirmpass : any = "";
  confirmpassFail : any = false;
  lastname : any = "";
  lastnameFail:any = "";
  genderFail : any = false;
  bdayDate : any = "";
  bdayFail:any = false;
  timezone : any;
  locale : any;
  zipcode : any;
  cntry : any;
  state : any;
  submitted : any = false;
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
  
  phoneNumberPattern: any = '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$';
  validatePhnNum(){
    const expression = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$');
    if(this.phnNum.match(expression)){
      this.phnNumFail = false
    }
    else{
      this.phnNumFail = true;
    }
  }
  
  firstnamePattern : any = '^[a-zA-Z\s]+$';
  validateFirstname(){
    const expression = new RegExp('^[a-zA-Z\s]+$');
    if(this.fn.match(expression)){
        this.firstnameFail = false
    }
    else{
      this.firstnameFail = true;
    }
  }

  lastnamePattern: any = '^[a-zA-Z\s]+$';
  validateLastname(){
    const expression = new RegExp('^[a-zA-Z\s]+$');
    if(this.lastname.length>0 && !this.lastname.match(expression)){
      this.lastnameFail = true;
    }
    else if(this.lastname.match(expression)){
      this.lastnameFail = false;
    }
  }

  
  validateAddress(){
    if(this.addres.length < 1){
      this.addresFail = true;
    }
    else{
      this.addresFail = false;
    }
  }


  validateStatus(){
    if(this.selectedStatus.length === 0){
      this.selectedStatusFail = true;
    }
    else{
      this.selectedStatusFail = false;
    }
  }

  emailPattern : any = '^[a-z0-9]+@[a-z]+\.com$';
  validateEmail(){
    const expression = new RegExp('^[a-z0-9]+@[a-z]+\.com$');
    if(this.emailId.match(expression)){
        this.emailFail = false
    }
    else{
      this.emailFail = true;
    }
  }
  
  validateGender(){
    if(this.gnder ===""){
        this.genderFail = true;
    }
    else{
      this.genderFail = false;
    }
  }


  validateRoles(){
    if(!this.selectedRolesCode){
        this.selectedRolesCodeFail = true;
    }
    else{
      this.selectedRolesCodeFail = false;
    }
  }

  passwordPattern : any = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$';
  validatepassword(){
    const expression = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$');
    if(this.pass.match(expression)){
      this.passwordregexfail = false
    }
    else{
      this.passwordregexfail = true;
    }
  }

  // validateConfirmPassword(){
  //   if(this.cnfrmPass.errors?.['empty'] || this.cnfrmPass.errors?.['notEqual']){
  //     this.confirmpassFail = true;
  //   }
  //   else{
  //     this.confirmpassFail = false;
  //   }
  // }

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
      // this.validatePhnNum();
      // this.validateFirstname();
      // this.validateAddress();
      // this.validateStatus();
      // this.validateEmail();
      // this.validatepassword();
      // this.validateRoles();
      // this.validateConfirmPassword();
      // this.validateLastname();
      // this.validateGender()
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

      // if(!this.phnNumFail && !this.firstnameFail && !this.addresFail && !this.selectedStatusFail && !this.emailFail && !this.passwordregexfail && !this.selectedRolesCodeFail 
      //   && !this.confirmpassFail && !this.lastnameFail && !this.genderFail && !this.bdayFail){
      //   this.userData.username = this.user;
      //   this.userData.firstname = this.fn;
      //   this.userData.lastname = this.lastname;
      //   this.userData.email = this.emailId;
      //   this.userData.country = this.cntry;
      //   this.userData.state = this.state;
      //   this.userData.mobile = this.phnNum;
      //   this.userData.status = this.selectedStatus;
      //   this.userData.birthday = this.bdayDate;
      //   this.userData.address = this.addres;
      //   this.userData.zipcode = this.zipcode;
      //   this.userData.timezone = this.timezone;
      //   this.userData.locale = this.locale;
      //   this.userData.gender = this.gnder;
      //   this.userData.roles = this.selectedRolesCode;
      //   console.log(this.selectedRolesCode)
      //   this.userData.image = this.image;
      //   this.userData.password = this.confirmpass;
      //   this.userData.description = this.description;
      //   this.userData.createdTime = this.createdTime.toString();
      //   console.log(this.userData)
      //   this.userService.userCreated.next(true)
      //   this.userService.addUser(this.userData).subscribe((data)=>{})
      //   // this.http.post("http://localhost:3000/users",this.tdata).subscribe(data=>{})
        
      //   this.router.navigate(['main/userList'])
      //   setTimeout(()=>{
      //     this.userService.userCreated.next(true);
      //   },2000)
      //   console.log(this.form.errors)
      // }
      // else{
          
      // }
      
      
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
