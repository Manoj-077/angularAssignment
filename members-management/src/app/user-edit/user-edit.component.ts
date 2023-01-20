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
 
  @ViewChild('img') inputImage : ElementRef;
  username:any;
  detailsObj: any = "";
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


  userRole : any;
  isEditModeOn : any = false;

  


  zipcode : any;
  country : any;
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
  zipcodePattern : any = "^[0-9]+$";
  submitted : any = false;
  x = this.autoLogoutService.logoutTime;
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
      this.country = this.detailsObj.country;
      this.state = this.detailsObj.state;
      this.userId = this.detailsObj.id;
      this.image = this.detailsObj.image;
      this.userRole = this.detailsObj.roles;
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

 
  
  validateBday(){
    const thisYear = new Date();
    let bdayYear = this.detailsObj.birthday.slice(0,4) 
    if(this.detailsObj.birthday){
      if(bdayYear>=thisYear.getFullYear()){
      this.bdayFail = true;
      }else{
        this.bdayFail = false;
      }
    }
  }
  
  onSubmit(f:NgForm){
    this.validateBday()
    this.submitted = true;
    if(!this.bdayFail && f.valid){
      this.detailsObj.country = this.country;
      this.detailsObj.state = this.state;
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
