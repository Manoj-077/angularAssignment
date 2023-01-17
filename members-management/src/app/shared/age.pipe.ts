import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if(value){
      let todayDate:any = new Date();
      
      let userDOB:any = new Date(value);
    
      let age:any = "";
      
        age = todayDate - userDOB;
        age = Math.round(age/(365*1000*60*60*24));
        return age;
    }
    else{
      return "";
    }
    
    
    
  }

}
