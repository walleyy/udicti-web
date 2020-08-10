import { ActivityService } from './../../../service/activity.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivityDetails } from 'src/app/modal/activityDetails.modal';



@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  images = [
    '../../assets/img/team/1.jpg',
    '../../assets/img/team/2.jpg',
    '../../assets/img/team/3.jpg',
    '../../assets/img/team/1.jpg',
    '../../assets/img/team/2.jpg',
    '../../assets/img/team/3.jpg',
  ];

  baseUrl = 'incubatee/';
  activityDetailsArray;
  filename: string;

  constructor( private activity: ActivityService
 ) { }

  ngOnInit() {

    this.activity.getActivities().subscribe(res => {
      this.activityDetailsArray = res;
      console.log(res);

     });

  }

}
