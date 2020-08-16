import { ActivityService } from './../../../service/activity.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivityDetails } from 'src/app/modal/activityDetails.modal';
import { map } from 'rxjs/operators';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';




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
  private commentsPath='/comments';
  public comments_array:any[];

  constructor(private activity: ActivityService,
              private db:AngularFireDatabase
              ) { }

  ngOnInit() {

    this.activity.getActivities().subscribe(res => {
      this.activityDetailsArray = res;
      console.log('activity',res);
     });
    

     this.db.list(`${this.commentsPath}/`).snapshotChanges().pipe(map(arr=>{
       return arr.map(res=>Object.assign(res.payload.val(),{key:res.key}))
     }))
     .subscribe(snap=>{
       console.log(snap);
       this.comments_array=snap;
      })
  }

}
