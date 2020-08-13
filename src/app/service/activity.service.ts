import { snapshotChanges, AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material';
import { ActivityDetails } from './../modal/activityDetails.modal';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
 private baseUrl = '/incubatee';
 key;
 uploadTask;

  constructor( private storage: AngularFireStorage,
               private snackBack: MatSnackBar,
               private db: AngularFireDatabase) {

              //extraction of key from localstorage
              this.key= localStorage.getItem('key');

                }


  upload(details: any) {
    // const id= Math.random().toString(36).substring(2)

    
  const ref = this.storage.ref(`${this.baseUrl}`);

  this.uploadTask = ref.child(details.activityDetails.file.name).put(details.activityDetails.file);
  


 this.uploadTask.snapshotChanges().pipe(
  finalize(() => { ref.child(details.activityDetails.file.name)
  .getDownloadURL().subscribe(fileUrl => {
        details.activityDetails.fileUrl = fileUrl;
           // saving data to the database
        this.saveToFirebaseDb(details, this.key);
        console.log(fileUrl);
      });

                   this.snackBack.open('Activity addded', 'Ok', {duration: 2000});

    })  // end of finalize
    ).subscribe();
       }

  private saveToFirebaseDb(details: any, key: string) {
    this.db.list(`${this.baseUrl}/` + key).push(details).then(x=>{
       //updating the nodes to add their own keys
      this.db.object('/incubatee/' + key + '/' + x.key + '/' + 'activityDetails').update({nodeID: x.key});
    });
  }

  getpercentageChange() {
    return this.uploadTask.percentageChanges();
  }

  getActivities(){
     return this.db.list(`${this.baseUrl}/` + this.key).snapshotChanges().pipe(map(arr=>{
       return arr.map(res=>{
         return Object.assign(res.payload.val(), {$key:res.key})
       })
      }))
  }//end of getActivities
  

}

