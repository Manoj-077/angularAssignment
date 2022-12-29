import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datepipe'
})
export class DatePipe implements PipeTransform {
  
  hours: number;
  ampm : string;
  months:any = [];
  transform(value: Date, ...args: unknown[]): unknown {
    let date = new Date(value)
    let minutes:any;
    if(date.getMinutes()<10){
      minutes = "0"+date.getMinutes();
    }
    else{
      minutes = date.getMinutes();
    }
    if(date.getHours()>12){
      this.hours = date.getHours() - 12;
      this.ampm = 'PM'
    }
    else{
      this.hours = date.getHours();
      this.ampm = 'AM'
    }
    this.months = ['Jan','Feb','Mar','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    return  date.getDate()+"-"+this.months[date.getMonth()]+"-"+date.getFullYear()+" "+this.hours+":"+minutes+this.ampm;
  }

}
