import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { DatePipe } from '../shared/date.pipe';
import {ConfirmationService} from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import { AutoLogoutService } from '../services/auto-logout.service';
import { BnNgIdleService } from 'bn-ng-idle';

interface Page {
  name: string;
  records: number;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent implements OnInit {
  @ViewChild('popup') pop :ElementRef;
  @ViewChild('username') username : ElementRef;
  @ViewChild('description') description : ElementRef;
  loggedUser : string;
  userExist : boolean =false;
  users : any
  user: any;
  roles : any;
  name : any;
  fetchedData : any = [];
  rows = 10;
  first = 0;
  cdata : any;
  dobj:any;
  i = false;
  date : Date = new Date();
  userCreated : any;
  pageNums: Page[];
  pageNumSelected: Page;

  constructor(private http: HttpClient, private router: Router, private userService : UserService,
    private confirmationService: ConfirmationService, private route:ActivatedRoute, private messageService: MessageService,
    private autoLogoutService : AutoLogoutService, private bnIdle: BnNgIdleService){
      this.pageNums = [
        { name: '10', records: 10 },
        { name: '15', records: 15 },
        { name: '20', records: 20 }
    ];
    console.log("hello")
    this.userService.userCreated.subscribe((data)=>{
      this.userCreated = data;
      this.showSuccess();
      // console.log(data)
      // this.router.navigate(["main/userList"])
    })
  }
  x = this.autoLogoutService.logoutTime;
  ngOnInit(): void {
    
    
    this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
      if(isTimedOut){
      this.autoLogoutService.logout() 
      }
    });
    this.roles = localStorage.getItem('roles');
    this.roles = JSON.parse(this.roles)
    // this.userService.loggedIn.subscribe((data)=>{
    //   this.name = data
    //   console.log(this.name)
    // }
    // )
    this.http.get("http://localhost:3000/users").subscribe((data)=>{
      this.fetchedData = data;
      this.fetchedData = this.fetchedData.slice(2)
     
    });
  //  this.userService.userCreated.subscribe({
  //   next: (data) => { 
  //     console.log(data)
  //     }, 
  //   error: () => {},
  //   complete: () => {
  //     this.showSuccess()
  //     console.log("success message");
  //   }})
  
}

addSingle() {
  this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
}
  
  //     if(data===true){
  //       console.log("success message");
  //       // this.showSuccess();  
  //     }
  //  },)

  
  
 
onSelected(value:any){
  if(this.pageNumSelected===undefined){

  }else{
    this.rows = this.pageNumSelected.records;
  }
  // console.log(this.pageNumSelected)
  
}

showSuccess() {
  this.messageService.add({severity:'success', summary: 'Success', detail: 'User Created'});
}


  openPop(){
    this.pop.nativeElement.style.visibility = 'visible';
    
  }
  closePopup(){
    this.pop.nativeElement.style.visibility = 'hidden';
  }
  clear(){
    this.username.nativeElement.value = "";
    this.description.nativeElement.value = "";
  }
  deleteConfirm(data:any) {
    this.cdata = data;
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete '+"'"+this.cdata.username+"'"+'?',
        accept: () => {
            //Actual logic to perform a confirmation
            this.http.get("http://localhost:3000/users").subscribe((data)=>{
              let arr:any = [];
              arr = data;
              
              for (let i=0;i<arr.length;i++){
                if(arr[i].username === this.cdata.username){
                  this.dobj = arr[i]
                  break
                }
              }
              
              this.http.delete('http://localhost:3000/users/'+this.dobj.id).subscribe((data)=>{
                console.log("deleted");
                setTimeout(()=>{
                  this.http.get("http://localhost:3000/users").subscribe((data)=>{
                    this.fetchedData = data;
                    this.fetchedData = this.fetchedData.slice(2)
                  })
              },100)
             })
              
              // let obj = arr.find((o:any)=>{
              //   o.username=== this.cdata.username
              // })
              // console.log("this is obj"+obj)
            })
        }
    });
}
  addUser(){
    const exp = new RegExp("^[a-zA-Z0-9_]*$");
    if(this.username.nativeElement.value.match(exp) && this.username.nativeElement.value.length>0){
        this.http.get("http://localhost:3000/users").subscribe((data)=>{
        this.users = data;
        for (let i=0;i< this.users.length;i++){
          if(this.users[i].username === this.username.nativeElement.value){
            this.userExist = true
            break
          }
        }
        if(!this.userExist){
        this.router.navigate(['/main/userDetails'])
        localStorage.setItem('newUser',this.username.nativeElement.value)
        localStorage.setItem('description',this.description.nativeElement.value)
        }
        else{
          this.userExist=true;
        
          setTimeout(()=>{
            this.userExist = false;
            
          }, 2000) 
        }
        this.clear();
        // this.user = this.users.find((o:any)=>{o.username === this.username.nativeElement.value})
        // console.log(this.user)
      })
    }
    else{
        this.userExist=true;
        
        setTimeout(()=>{
          this.userExist = false;
         
        }, 2000)  
    }
  }

  


  gotoEdit(data:any) {
    
    localStorage.setItem('userEdit',data.username)
    
    this.userService.editMode.next(true);
}


  displayModal: boolean;

    displayBasic: boolean;

    displayBasic2: boolean;

    displayMaximizable: boolean;

    displayResponsive: boolean;

    displayPosition: boolean;

    position: string;

    showModalDialog() {
        this.displayModal = true;
    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    showBasicDialog2() {
        this.displayBasic2 = true;
    }

    showMaximizableDialog() {
        this.displayMaximizable = true;
    }

    showPositionDialog(position: string) {
        this.position = position;
        this.displayPosition = true;
    }

    showResponsiveDialog() {
        this.displayResponsive = true;
        // console.log(this.pageNumSelected)
    }



    ngOnDestroy(){
      this.bnIdle.stopTimer();
      console.log('destroyed userlist')
    }
}
