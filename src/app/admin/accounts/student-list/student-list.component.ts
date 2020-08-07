import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  private toUsersPath='/users';
  public user_array:any[]

  constructor(private db:AngularFireDatabase) { }

  ngOnInit() {
    this.db.list(`${this.toUsersPath}/`).snapshotChanges().pipe(map(res=>{
      return res.map(snap=>{
        return Object.assign( snap.payload.val(), {key:snap.key})
      })
    }))
    .subscribe(res=>{
      this.user_array=res;
      console.log(res);
    })

  }


  removeUser(){
    console.log('user removed')
  }

}
