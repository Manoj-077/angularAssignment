import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserDetail } from '../shared/userDetail.model';
@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.css']
})
export class UserDetailsPageComponent {

  @ViewChild('f') form : NgForm;
  constructor(private title: Title) {}

	ngOnInit() {
		this.title.setTitle('Angular Cascading or Dependent Dropdown');
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
    mail : "",
    country : "",
    state : "",
    num : "",
    status : ""  ,
    bday:""
  }
  onSubmit(){
      this.tdata.username = this.form.value.username;
      this.tdata.firstname = this.form.value.firstname;
      this.tdata.lastname = this.form.value.lastname;
      this.tdata.mail = this.form.value.email;
      this.tdata.country = this.form.value.country;
      this.tdata.state = this.form.value.state;
      this.tdata.num = this.form.value.mobile;
      this.tdata.status = this.form.value.status;
      this.tdata.bday = this.form.value.birthdayDate;

      console.log(this.tdata)
  }
 
	
}
