import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[PasswordValidator]',
  providers:[{
    provide: NG_VALIDATORS,
    useExisting: PasswordValidatorDirective,
    multi: true
  }]
})
export class PasswordValidatorDirective implements Validator {
  @Input() PasswordValidator: string;
  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    
    const expression = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')
    const controlToCompare = control.parent?.get(this.PasswordValidator);
    if(control.value?.length === 0){
      return {'empty':true}
    }
    
   
    if(controlToCompare && control.value !== controlToCompare.value){
      console.log(control.errors)
      return {'notEqual': true};
    }
    if(!control.value?.match(expression)){
      return {'regexfail': true}
    }
    
    return null;
  }

}
