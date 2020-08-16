import { NotificationService } from './../../service/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
CurrentDate: number = Date.now();
notification_array: any[]=[];
upcoming = [
  {
    head: 'marketing strategies',
    spann: 'join us in market exploration',
    time: '1000hrs',
    location: 'K.nyama'
  },
  {
    head: 'innovation week',
    spann: 'some of genuine minds deliverables',
    time: '800hrs',
    location: 'K.nyama'
  },
  {
    head: 'session with maktech IT',
    spann: 'we will have a session with members....',
    time: '1200hrs',
  location: 'K.nyama'
  },
  {
    head: 'saba saba showcase',
    spann: 'our projects will be showcased...',
    time: '1300hrs-16000hrs',
    location: 'K.nyama'
  },
  {
    head: 'IoT',
    spann: 'come and listen on new trends..',
    time: '1100hrs',
    location: 'K.nyama'
  },
  {
    head: 'cv building',
    spann: 'linguistic professors will be available to..',
    time: '1400hrs',
    location: 'K.nyama'
  },
];
posts = [
  {
    header: 'timetable out now'
  },
  {
    header: 'Ms.Mchocha callup for meeting'
  },
  {
    header: 'vacancy available'
  },
  {
    header: 'timetable out now'
  }
];

  constructor(private notificationService:NotificationService) { }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(res=>{

      console.log('res', res);

    let count:number=0;
    this.notification_array= [];
      res.forEach(element=>{
        if(element['notificationType']==='private') return;
        count++;
        this.notification_array.push(element);
       // 
       if(this.notification_array.length > 6) this.notification_array=this.notification_array.slice(0,6);
        this.notification_array.sort((a,b):any=>{ a.notificationDate< b.notificationDate ? -1 : a.notificationDate > b.notificationDate? 1: 0})
       // this.notification_array.push({position:count, heading: element['notificationHeader'], date: element['notificationDate'], type: element['notificationType']})
      })
      
      console.log(this.notification_array);
     


 })
}
}
