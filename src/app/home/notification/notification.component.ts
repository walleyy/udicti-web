import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
CurrentDate: number = Date.now();
events = [
  {
    head: 'marketing strategies',
    spann: 'join us in market exploration',
  },
  {
    head: 'innovation week',
    spann: 'some of genuine minds deliverables',
  },
  {
    head: 'session with maktech IT',
    spann: 'we will have a session with members....',
  },
  {
    head: 'saba saba showcase',
    spann: 'our projects will be showcased...',
  },
  {
    head: 'IoT',
    spann: 'come and listen on new trends..',
  },
  {
    head: 'cv building',
    spann: 'linguistic professors will be available to..',
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
carddisplay = 2;
  constructor() { }

  ngOnInit() {
  }
}
