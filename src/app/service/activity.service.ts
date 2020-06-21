import { snapshotChanges, AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material';
import { ActivityDetails } from './../modal/activityDetails.modal';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
 private baseUrl = '/incubatee';

 uploadTask;

  constructor( private storage: AngularFireStorage,
               private snackBack: MatSnackBar,
               private db: AngularFireDatabase) { }


 upload(details: any, key: string) {
   // const id= Math.random().toString(36).substring(2)
 const ref = this.storage.ref(`${this.baseUrl}`);

 this.uploadTask = ref.child(details.activityDetails.file.name).put(details.activityDetails.file);
 // updating the progressbar

 this.uploadTask.snapshotChanges().pipe(
  finalize(() => { ref.child(details.activityDetails.file.name)
  .getDownloadURL().subscribe(fileUrl => {
        details.activityDetails.fileUrl = fileUrl;
           // saving data to the database
        this.saveToFirebaseDb(details, key);
        console.log(fileUrl);
      });

                   this.snackBack.open('Activity addded', 'Ok', {duration: 2000});

    })  // end of finalize
    ).subscribe();
       }

  private saveToFirebaseDb(details: any, key: string) {
    this.db.list(`${this.baseUrl}/` + key).push(details);
  }

  getpercentageChange() {
    return this.uploadTask.percentageChanges();
  }


}

