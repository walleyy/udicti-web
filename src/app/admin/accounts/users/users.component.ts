import { MatSnackBar } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private applicationPath='/application';
  private userPath= '/users-role';
  private incubateeCoachPath='/incubatee-coach';
  table_array:any[];
  public uid:string;
  disable:boolean=false;

  constructor(private db:AngularFireDatabase, 
             private auth: AngularFireAuth,
             private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.db.list(`${this.applicationPath}`).snapshotChanges().pipe(map(res=>{
      return res.map(data=>{
       return Object.assign(data.payload.val(), {$key: data.key})
      })
    }))
    .subscribe(res=>{console.log(res);
      this.table_array=res;
    })
  }

  deleteUser(key:string, nodeID:string){
    this.disable=true;
    
    this.db.list(`${this.userPath}/`+ key).snapshotChanges().pipe(map(res=>{
      return res.map(data=>{
       return data.payload.val();
      })
    })).subscribe(res=>{
 
      //delete user udate
      this.db.object(`${this.userPath}/` +key + '/' + res[0]['nodeID']).update({deleteUser:true});
      console.log('node', nodeID);
      this.db.object(`${this.applicationPath}/` + nodeID).remove().then(x=>console.log('sucess'))
      .catch(error=>console.log(error))
      this.snackBar.open('Deleted', 'OK', {duration:3000});

     });

  }

  acceptUser(key:string, nodeID: string, applicant:any){
    this.db.list(`${this.userPath}/` + key).snapshotChanges().pipe(map(res=>{
      return res.map(data=>{
        return data.payload.val();
      })
    }))
    .subscribe(res=>{
      this.db.object(`${this.userPath}/` + key + '/' + res[0]['nodeID']).update({role:'incubatee'});
      this.db.object(`${this.applicationPath}/` + nodeID).remove().then(x=>console.log('Deleted Successful'))
      .catch(error=>console.log(error));
      this.snackBar.open('Application Accepted', 'OK', {duration: 3000});
    })

    let incubatee:any={
    name:applicant.name,
    projectName: applicant.projectName,
    userID: applicant.userID
    }
    this.db.list(`${this.incubateeCoachPath}/`).push(incubatee);
    
    
  }

}
