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
import { SortEvent } from 'primeng/api';

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
  
  username : any;
 
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
  permissions: any = "";
  isPaginate : any = false;
  isUserCreated : any = false;
  userCreatedSubcription : Subscription;
  userEditedSubscription: Subscription;
  x = this.autoLogoutService.logoutTime;
  constructor(private http: HttpClient, private router: Router, private userService : UserService,
    private confirmationService: ConfirmationService, private route:ActivatedRoute, private messageService: MessageService,
    private autoLogoutService : AutoLogoutService, private bnIdle: BnNgIdleService){
      this.pageNums = [
        { name: '10', records: 10 },
        { name: '15', records: 15 },
        { name: '20', records: 20 }
    ];
    
  }
  
  ngOnInit(): void {
    
    this.permissions = localStorage.getItem('permissions');
    this.permissions = JSON.parse(this.permissions)
    this.userCreatedSubcription  =  this.userService.userCreated.subscribe((data)=>{
     
      this.showSuccess();
      console.log("created users")
    })
    this.bnIdle.startWatching(this.x).subscribe((isTimedOut: boolean) => {
      if(isTimedOut){
      this.autoLogoutService.logout() 
      }
    });
    

    this.userService.getUsers().subscribe((data)=>{
      this.fetchedData = data;
      this.fetchedData = this.fetchedData.slice(2)
      if(this.fetchedData.length>9){
        this.isPaginate = true; 
      }
      else{
        this.isPaginate = false;
      }
    });

    this.userEditedSubscription = this.userService.userEdited.subscribe((data)=>{
      
        this.userEdited();
      
    })
 
  }



  onSelected(value:any){
  if(this.pageNumSelected===undefined){

  }else{
    this.rows = this.pageNumSelected.records;
  }
 
  
  }

  showSuccess() {
  
  this.messageService.add({severity:'success', summary: 'Success', detail: 'User Created'});
  
  }

  userDeleted(){
  this.messageService.add({severity:'success', summary: 'User Deleted!', detail: 'User Successfully deleted'});
  }

  userEdited(){
    this.messageService.add({severity:'success', summary: 'Success', detail: 'User Edited Successfully'})
  }

  userAlreadyExist(){
  this.messageService.add({severity:'warn', summary: 'Username Already Exists!', detail: 'Enter a Unique Username'});
  }

  fieldCannotBeEmpty(){
  this.messageService.add({severity:'warn', summary: 'Invalid', detail: 'Input Username Field'});
  }

 
  clear(){
    this.username = "";
    
  }
  deleteConfirm(data:any) {
    this.cdata = data;
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete '+"'"+this.cdata.username+"'"+'?',
        accept: () => {
            
            this.http.get("http://localhost:3000/users").subscribe((data)=>{
              let arr:any = [];
              arr = data;
              
              for (let i=0;i<arr.length;i++){
                if(arr[i].username === this.cdata.username){
                  this.dobj = arr[i]
                  break
                }
              }

              this.userService.deleteUser(this.dobj.id).subscribe((data)=>{
                console.log("deleted");
                this.userDeleted()
                
                setTimeout(()=>{
                  this.userService.getUsers().subscribe((data)=>{
                    this.fetchedData = data;
                    this.fetchedData = this.fetchedData.slice(2);
                    console.log('getting after delete')
                    console.log(this.fetchedData)
                    if(this.fetchedData.length<11){
                      this.isPaginate = false;
                      console.log('paginate to false')
                    }
                  })
                },200)
              })
            })
        }
    });
    
}
  addUser(){
    this.userExist = false;
    const exp = new RegExp("^[a-zA-Z0-9_]*$");
    if(this.username.match(exp) && this.username.length>0){

        this.userService.getUsers().subscribe((data)=>{
            this.users = data;
            for (let i=0;i< this.users.length;i++){
              if(this.users[i].username === this.username){
                this.userExist = true
                break
              }
            }
            if(!this.userExist){
            this.router.navigate(['/main/userDetails'])
            localStorage.setItem('newUser',this.username)
            }
            else{
              this.userAlreadyExist()
            }
            this.clear();
        })
    }
    else{
        this.fieldCannotBeEmpty()
    }
  }

  
  gotoEdit(data:any) {
    
    localStorage.setItem('userEdit',data.username)
    
   
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
    }



    ngOnDestroy(){
      this.bnIdle.stopTimer();
      console.log('destroyed userlist')

      this.userCreatedSubcription.unsubscribe();
      this.userEditedSubscription.unsubscribe();
    }
}
