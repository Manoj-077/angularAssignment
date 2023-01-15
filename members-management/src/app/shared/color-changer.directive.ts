import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorChanger]'
})
export class ColorChangerDirective {

  constructor(private elementRef : ElementRef) {
    let bgc : boolean = false;
    let c : Boolean = false;
    
    function colorChanger(){
      if(c){
        elementRef.nativeElement.style.color = 'orange';
      }
      else{
        elementRef.nativeElement.style.color = 'green';
      }
    }
    // function bgColorChanger(){
    //   if(bgc){
    //     elementRef.nativeElement.style.backgroundColor = 'blue'
    //   }
    //   else{
    //     elementRef.nativeElement.style.backgroundColor = 'red'
    //   }
    // }
    setInterval(()=>{
      c= !c;
      bgc = !bgc;
      colorChanger();
      // bgColorChanger()
    },500)
    

   }

}
