import { NotificationService } from './../../service/notification.service';
import { SessionService } from './../../service/session.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  heading: string;
  type: number;
  timeId: number;
  members: string[any];
}

export interface Notification{
  notificationHeader:string;
  notificationType:string;
  notificationDetails:string;
  notificationDate:string;
  notificationLocation?:string;

}


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
 table_array:any[]=[];
 displayedColumns: string[]=[];
 dataSource;
 spinnerLoaded= true;

  constructor(private notificationService:NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(res=>{
      this.spinnerLoaded=false;
      console.log('res', res);

    let count:number=0;
    this.table_array= [];
      res.forEach(element=>{
        count++;
   
    this.table_array.push({position:count, heading: element['notificationHeader'], date: element['notificationDate'], type: element['notificationType']})

      })
        
      this.table_array.sort((a,b):any=>{ a.Date< b.Date? -1 : a.Date > a.Date ? 1 : 0});
      console.log('table',this.table_array);
      this.displayedColumns = ['position', 'heading', 'date', 'type'];
      this.dataSource = new MatTableDataSource(this.table_array);
     
    })
  }
 
  // for options
  options: string[] = ['public', 'private'];
  isDisabled = true;

  // form declaration
  setNotification = new FormGroup({
  heading : new FormControl(''),
  type: new FormControl(''),
  details: new FormControl(''),
  dateID: new FormControl(''),
  location: new FormControl(),
  });



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  changeType(value) {
    console.log(value);
    if (value === 'private') {
      this.isDisabled = false;
      return this.isDisabled;
    } else {
      return !this.isDisabled;
    }
  }

  postNotification(){
  console.log("Button works");
  var notification:Notification={
    notificationHeader: this.setNotification.value.heading,
    notificationDetails:this.setNotification.value.details,
    notificationType: this.setNotification.value.type,
    notificationDate: this.setNotification.value.dateID.toString(),
    notificationLocation: this.setNotification.value.location
  }
  this.notificationService.postNotification(notification);
  }
}
