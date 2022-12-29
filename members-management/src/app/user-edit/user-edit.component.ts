import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  @ViewChild('f') form : NgForm;
  ngOninit(){
    
  }
  cancel(){
    console.log(this.form.value)
  }
}
