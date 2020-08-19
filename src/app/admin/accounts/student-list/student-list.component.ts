import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  private incubateeCoachPath='/incubatee-coach';
  private userRolePath= '/users-role';
  public incubatee_array;
  public toBeDeleted:boolean=false;

  constructor( private db:AngularFireDatabase) { }



  ngOnInit() {
    this.db.list(`${this.incubateeCoachPath}/`).snapshotChanges().pipe(map(arr=>{
       return arr.map(res=>{
        return  Object.assign(res.payload.val(), {key:res.key})
      })

    })).subscribe(snap=>{
      this.incubatee_array=snap;
      console.log(snap);
      
    })
  }


  deleteIncubatee(incubatee:any){

   console.log(this.toBeDeleted);
   console.log(incubatee);
   this.db.object(`${this.incubateeCoachPath}/` + incubatee.key).remove();
   this.db.list(`${this.userRolePath}/` + incubatee.userID).snapshotChanges().pipe(map(arr=>{
     return arr.map(res=>{
       return res.key;
     })
   })).subscribe(nodeKey=>{
     this.db.object(`${this.userRolePath}/` + incubatee.userID + '/' + nodeKey).update({deleteUser:true});
   })
  }

}