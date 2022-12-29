import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserDetail } from '../shared/userDetail.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent {

  @ViewChild('f') form : NgForm;
  @ViewChild('img') inputImage : ElementRef;
  @ViewChild('username') usrname : ElementRef;
  user : any;
  pass: any;
  editMode : boolean = false;
  description : any;
  passwordregexfail : boolean = false;
  image = 'https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg';
  nonImage : boolean = false;
  createdTime : Date = new Date()
  // ig:any;
  constructor(private title: Title, private http:HttpClient, private router : Router, private userService: UserService) {

  }

	ngOnInit() {
		
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
  ngAfterViewChecked(){
   
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
    roles : {
      canEdit : "",
      canDelete : "",
      canAdd :""
        },
    image : "" , 
    password: "",
    description:"",
    createdTime: "" 
  }
  onSubmit(){
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
      this.tdata.roles.canEdit = this.form.value.canEdit;
      this.tdata.roles.canDelete = this.form.value.canDelete;
      this.tdata.roles.canAdd = this.form.value.canAdd;
      this.tdata.image = this.image;
      this.tdata.password = this.form.value.confirmpassword;
      this.tdata.description = this.description;
      this.tdata.createdTime = this.createdTime.toString();
      this.http.post("http://localhost:3000/users",this.tdata).subscribe((data)=>console.log(data))
      this.router.navigate(['main/userList'])
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

	
}
