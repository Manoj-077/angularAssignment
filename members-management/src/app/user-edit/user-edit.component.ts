import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutoLogoutService } from '../services/auto-logout.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { UserService } from '../services/user.service';

interface Roles {
  name: string,
  code: string
}


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  @ViewChild('f') form : NgForm;
  @ViewChild('img') inputImage : ElementRef;
  username:any;
  detailsObj: any;
  image : any;
  newImage : any;
  states : any;
  newImg : boolean = false;
  nonImage : boolean = false;
  userId:any = "";
  editedDetails : any;
  roles: Roles[];
  role : any = "";
  selectedRolesCode: any = "";
  selectedRole : any = "";
  addres:any=""
  addresFail:any= false;
  selectedRolesCodeFail : any = false;
  isEditModeOn : any = false;

  
  timezone : any;
  locale : any;
  zipcode : any;
  cntry : any;
  state : any;
  firstname: any;
  lastname : any;
  birthday : any;
  mobile : any;
  gender : any;
  email : any;
  password : any;
  confirmPassword : any;
  status : any;
  bdayFail : any = false;
  constructor(private http: HttpClient, private router:Router, private autoLogoutService: AutoLogoutService,
    private bnIdle:BnNgIdleService, private userService : UserService){
      this.roles = [
        {name: 'Admin', code: 'Admin'},
        {name: 'ITOuser', code: 'ITOuser'},
          ];
  }

  Countries = [
    { name: 'USA', states: ['New York','California','Arizona' ] },
    { name: 'India', states: ['Delhi','Karnataka', 'Maharashtra' ] },
  ];

  changeCountry(country: any) { 
    if(country.target.value==='USA'){
      this.states = this.Countries[0].states;
    }
    else if(country.target.value==='India'){
      this.states = this.Countries[1].states;
    }
		
	}
  x = this.autoLogoutService.logoutTime;

  ngOnInit(){

    this.role = localStorage.getItem('roles');
    this.role = JSON.parse(this.role);
    this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
      if(isTimedOut){
      this.autoLogoutService.logout() 
      }
    });

    this.username = localStorage.getItem('userEdit')
    console.log(this.username)

    this.userService.getUsers().subscribe((data)=>{
      let arr:any;
      arr = data;
      for (let i=0;i<arr.length;i++){
        if(arr[i].username === this.username){
          this.detailsObj = arr[i];
        }
      }
      if(this.detailsObj.country==='USA'){
        this.states = this.Countries[0].states;
      }
      else{
        this.states = this.Countries[1].states;
      }


      if(this.detailsObj.roles==='Admin'){
        this.selectedRolesCode = [{name: 'Admin', code: 'Admin'}]
      }
      else if(this.detailsObj.roles === 'ITOuser'){
        this.selectedRolesCode = [{name: 'ITOuser', code: 'ITOuser'}]
      }
      
      this.username = this.detailsObj.username;
      this.firstname = this.detailsObj.firstname;
      this.lastname = this.detailsObj.lastname;
      this.birthday = this.detailsObj.birthday;
      this.mobile = this.detailsObj.mobile;
      this.addres =  this.detailsObj.address;
      this.zipcode = this.detailsObj.zipcode;
      this.cntry = this.detailsObj.country;
      this.state = this.detailsObj.state;
      this.timezone = this.detailsObj.timezone;
      this.locale = this.detailsObj.locale;
      this.gender = this.detailsObj.gender;
      this.email = this.detailsObj.email;
      this.password = this.detailsObj.password;
      this.confirmPassword = this.detailsObj.password
      this.status = this.detailsObj.status;
      this.selectedRolesCode = this.selectedRolesCode[0].name;
      // this.form.setValue({
      //   username : this.detailsObj.username,
      //   firstname : this.detailsObj.firstname,
      //   lastname : this.detailsObj.lastname,
      //   birthday : this.detailsObj.birthday,
      //   mobile : detailsObj.birthday,
      //   address : this.detailsObj.address,
      //   zipcode : this.detailsObj.zipcode,
      //   country : this.detailsObj.country,
      //   state : this.detailsObj.state,
      //   timezone : this.detailsObj.timezone,
      //   locale : this.detailsObj.locale,
      //   gender : this.detailsObj.gender,
      //   email : this.detailsObj.email,
      //   password : this.detailsObj.password,
      //   confirmpassword : this.detailsObj.password,
        
      //   status : this.detailsObj.status,
      //   roles : this.selectedRolesCode[0].name
        
      // })
      

      this.userId = this.detailsObj.id;
      this.image = this.detailsObj.image
    })

   
  }

  ngOnDestroy(){
    this.bnIdle.stopTimer();
    console.log('destroyed edit')
  }
  
  onEdit(){
    this.isEditModeOn = true;
  }

 onfileselected(event:any){
  console.log(event.target.files[0].size)
  if((event.target.files[0].type === "image/png" || event.target.files[0].type === "image/jpg") && event.target.files[0].size< 2000000){
    var reader = new FileReader()
  reader.readAsDataURL(event.target.files[0])
  reader.onload = (event:any)=> {
    this.newImage = event.target.result;
    }
    this.nonImage = false;
    this.newImg = true;
  }
  else{
    this.nonImage = true
    this.inputImage.nativeElement.value = "";
    this.newImg = false;
    setTimeout(()=>{
      this.nonImage = false;
    },3000)
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
  validateRoles(){
    if(!this.selectedRolesCode){
        this.selectedRolesCodeFail = true;
    }
    else{
      this.selectedRolesCodeFail = false;
    }
  }

  
  validateBday(){
    const thisYear = new Date();
    let bdayYear = this.birthday.slice(0,4) 
    if(this.birthday){
      if(bdayYear>=thisYear.getFullYear()){
      this.bdayFail = true;
      }else{
        this.bdayFail = false;
      }
    }
  }

  onSubmit(){
    this.validateAddress();
    this.validateRoles()
    if(!this.addresFail && !this.selectedRolesCodeFail && !this.bdayFail){
    this.detailsObj.address = this.addres;
    this.detailsObj.zipcode = this.zipcode;
    this.detailsObj.country = this.cntry;
    this.detailsObj.state = this.state;
    this.detailsObj.timezone = this.timezone;
    this.detailsObj.locale = this.locale;
    this.detailsObj.roles = this.selectedRolesCode;
    this.detailsObj.status = this.status;
    this.detailsObj.birthday = this.birthday;
    if(!this.newImage){
      this.detailsObj.image = this.image
    }
    else{
      this.detailsObj.image = this.newImage;
    }
    
    this.editedDetails = this.detailsObj;
    this.isEditModeOn = false;
    this.userService.editUser(this.userId,this.editedDetails).subscribe((data)=>{
      this.router.navigate(['main/userList'])
    })
    
  }

  }

  cancel(){
    this.isEditModeOn = false;
    this.router.navigate(['main/userList'])
  }
  
}
