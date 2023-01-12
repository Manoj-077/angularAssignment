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

  @ViewChild('f') form : NgForm;
  @ViewChild('img') inputImage : ElementRef;
  @ViewChild('username') usrname : ElementRef;
  @ViewChild('confirmPass') confirmpassword: ElementRef;
  @ViewChild('confirmpassword') cnfrmPass : NgForm;
  @ViewChild('lname') lastnameRef : NgForm;
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
    // console.log(this.usrname.nativeElement.value)
    // this.usrname.nativeElement.value= this.user;
    // this.form.patchValue({
    //   username: this.user
    // })
  //  this.http.get("http://localhost:3000/users").subscribe((data)=>{
  //   let arr:any = []
  //   arr = data;
  //   this.ig = arr.find((o:any)=>o.username==="abcd")
  //   console.log(this.ig.image)
  //  })
  }
  
  validatePhnNum(){
    const expression = new RegExp('^[0-9]{10}$');
    if(this.phnNum.match(expression)){
      this.phnNumFail = false
    }
    else{
      this.phnNumFail = true;
    }
  }
  
  validateFirstname(){
    const expression = new RegExp('^[a-zA-Z\s]+$');
    if(this.fn.match(expression)){
        this.firstnameFail = false
    }
    else{
      this.firstnameFail = true;
    }
  }

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

  validateEmail(){
    const expression = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    if(this.emailId.match(expression)){
        this.emailFail = false
    }
    else{
      this.emailFail = true;
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

  validatepassword(){
    const expression = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$');
    if(this.pass.match(expression)){
      this.passwordregexfail = false
    }
    else{
      this.passwordregexfail = true;
    }
  }

  validateConfirmPassword(){
    if(this.cnfrmPass.errors?.['empty'] || this.cnfrmPass.errors?.['notEqual']){
      this.confirmpassFail = true;
    }
    else{
      this.confirmpassFail = false;
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

  tdata = {
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
  onSubmit(){
      this.validatePhnNum();
      this.validateFirstname();
      this.validateAddress();
      this.validateStatus();
      this.validateEmail();
      this.validatepassword();
      this.validateRoles();
      this.validateConfirmPassword();
      this.validateLastname();

      if(!this.phnNumFail && !this.firstnameFail && !this.addresFail && !this.selectedStatusFail && !this.emailFail && !this.passwordregexfail && !this.selectedRolesCodeFail 
        && !this.confirmpassFail && !this.lastnameFail){
        this.tdata.username = this.user;
        this.tdata.firstname = this.form.value.firstname;
        this.tdata.lastname = this.form.value.lastname;
        this.tdata.email = this.form.value.email;
        this.tdata.country = this.form.value.country;
        this.tdata.state = this.form.value.state;
        this.tdata.mobile = this.form.value.mobile;
        this.tdata.status = this.form.value.status;
        this.tdata.birthday = this.form.value.birthday;
        this.tdata.address = this.form.value.address;
        this.tdata.zipcode = this.form.value.zipcode;
        this.tdata.timezone = this.form.value.timezone;
        this.tdata.locale = this.form.value.locale;
        this.tdata.gender = this.form.value.gender;
        this.tdata.roles = this.selectedRolesCode;
        console.log(this.selectedRolesCode)
        this.tdata.image = this.image;
        this.tdata.password = this.form.value.confirmpassword;
        this.tdata.description = this.description;
        this.tdata.createdTime = this.createdTime.toString();
        console.log(this.tdata)
        this.userService.userCreated.next(true)
        this.http.post("http://localhost:3000/users",this.tdata).subscribe(data=>{})
        
        this.router.navigate(['main/userList'])
        setTimeout(()=>{
          this.userService.userCreated.next(true);
        },2000)
        console.log(this.form.errors)
      }
      else{
          
      }
      
      
  }
 onCancel(){
  
   this.router.navigate(['main/userList']);
   
   this.form.reset();
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
