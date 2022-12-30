import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  basicData: any;
  basicOptions: any;
  username: any;
  fetchedData: any;
  arr:any = [];
  currentDate: Date = new Date();
  todayDate : number;
  counts:any = {}
  constructor(private http:HttpClient){

  }
  ngOnInit(){
    this.username =localStorage.getItem('username');
    this.todayDate = this.currentDate.getDate()
    this.http.get("http://localhost:3000/users").subscribe((data)=>{
        this.fetchedData = data;
        for(let i=2;i<this.fetchedData.length;i++){
          let fullDate = new Date(this.fetchedData[i].createdTime)
          let createdDate = fullDate.getDate()
          if((this.todayDate - createdDate)<7){
              this.arr.push(this.todayDate - createdDate) // getting and pushing data of last 7 days
          }
        }
        this.arr = this.arr.sort((a:any, b:any) => b - a); //  sorting desecending
        console.log(this.arr)
        for (const num of this.arr) {
          this.counts[num] = this.counts[num] ? this.counts[num] + 1 : 1; // getting counts
        }
        console.log(this.counts)
        this.basicData = {
          labels: ['lastSeventhDay', 'lastSixthDay', 'lastFifthDay', 'lastFourthDay', 'lastThirdDay', 'yesterday', 'today'],
          datasets: [
              {
                  label: 'First Dataset',
                  data: [this.counts[6], this.counts[5], this.counts[4], this.counts[3], this.counts[2], this.counts[1], this.counts[0]],
                  fill: false,
                  borderColor: '#42A5F5',
                  tension: .4
              },
          ]
      };
    })

    
  }
}
