import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-incubatee-timeline',
  templateUrl: './incubatee-timeline.component.html',
  styleUrls: ['./incubatee-timeline.component.scss']
})
export class IncubateeTimelineComponent implements OnInit {

  private incubateePath='/incubatee';
  private commentsPath='/comments'
  private incubateeName: string;
  private activity_array: any[];
  private comment_array: any[];
  private incubateeID: string;
  @ViewChild('name', {static:false}) name: ElementRef;

  constructor( private route:ActivatedRoute,
              private db:AngularFireDatabase) {
     console.log('route',this.route.snapshot.queryParams['search']);
     this.incubateeName= this.route.snapshot.queryParams['name'];

     this.incubateeID= this.route.snapshot.queryParams['search']
     this.db.list(`${this.incubateePath}/`+ this.incubateeID).snapshotChanges().pipe(map(arr=>{
       return arr.map(res=>Object.assign(res.payload.val(), {key:res.key}))
     })).
     subscribe(snap=>{console.log(snap)
       this.activity_array= snap;
    });
   }

  ngOnInit() {
 
    this.db.list(`${this.commentsPath}/`).snapshotChanges().pipe(map(arr=>{
      return arr.map(res=>Object.assign(res.payload.val(), {key:res.key}))
    }))
    .subscribe(snap=>{
      this.comment_array=snap;
    })
  }


  addComment(nodeID:string, name:HTMLInputElement){
    console.log('value',this.name.nativeElement.value);
    if(this.name.nativeElement.value)
     this.db.list(`${this.commentsPath}/`).push({comment:this.name.nativeElement.value, activityID: nodeID});
      this.name.nativeElement.value=""; 
  }

}
