import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
CurrentDate: number = Date.now();
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

  constructor() { }

  ngOnInit() {
  }
}
