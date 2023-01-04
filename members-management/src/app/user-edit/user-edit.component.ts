import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutoLogoutService } from '../services/auto-logout.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  @ViewChild('f') form : NgForm;
  username:any;
  detailsObj: any;
  image : any;
  newImage : any;
  states : any;
  newImg : boolean = false;
  nonImage : boolean = false;
  userId:any = "";
  editedDetails : any;
  constructor(private http: HttpClient, private router:Router, private autoLogoutService: AutoLogoutService){

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
    this.username = localStorage.getItem('userEdit')
    console.log(this.username)
    this.http.get("http://localhost:3000/users").subscribe((data)=>{
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

        this.form.setValue({
          username : this.detailsObj.username,
          firstname : this.detailsObj.firstname,
          lastname : this.detailsObj.lastname,
          birthday : this.detailsObj.birthday,
          mobile : this.detailsObj.mobile,
          address : this.detailsObj.address,
          zipcode : this.detailsObj.zipcode,
          country : this.detailsObj.country,
          state : this.detailsObj.state,
          timezone : this.detailsObj.timezone,
          locale : this.detailsObj.locale,
          gender : this.detailsObj.gender,
          email : this.detailsObj.email,
          password : this.detailsObj.password,
          confirmpassword : this.detailsObj.password,
          canEdit : this.detailsObj.roles.canEdit,
          canDelete : this.detailsObj.roles.canDelete,
          canAdd : this.detailsObj.roles.canAdd,
          status : this.detailsObj.status,
          
        })
        this.userId = this.detailsObj.id;
        this.image = this.detailsObj.image
    })
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
    this.newImg = false;
    setTimeout(()=>{
      this.nonImage = false;
    },3000)
  }
}
  onSubmit(){
    
    this.detailsObj.address = this.form.value.address;
    this.detailsObj.zipcode = this.form.value.zipcode;
    this.detailsObj.country = this.form.value.country;
    this.detailsObj.state = this.form.value.state;
    this.detailsObj.timezone = this.form.value.timezone;
    this.detailsObj.locale = this.form.value.locale;
    this.detailsObj.roles.canEdit = this.form.value.canEdit;
    this.detailsObj.roles.canDelete = this.form.value.canDelete;
    this.detailsObj.roles.canAdd = this.form.value.canAdd;
    this.detailsObj.status = this.form.value.status;
    if(!this.newImage){
      this.detailsObj.image = this.image
    }
    else{
      this.detailsObj.image = this.newImage;
    }
    
    this.editedDetails = this.detailsObj;
    this.http.put("http://localhost:3000/users/"+this.userId,this.editedDetails).subscribe((data)=>{
      this.router.navigate(['main/userList'])
    })
  }

  cancel(){
    
    this.router.navigate(['main/userList'])
  }

  autologout(){
    this.autoLogoutService.logout()
  }
}
