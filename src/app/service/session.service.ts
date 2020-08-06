import { MatSnackBar } from '@angular/material';
import { Session } from './../modal/session.modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { finalize, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
 private baseURL='/session';
 private dbBasePath='/sessions'

 private uploadTask;

  constructor(private storage:AngularFireStorage,
              private db:AngularFireDatabase,
              private snackBar: MatSnackBar) { }


    uploadSession(upload: Session){
      console.log(upload);
   
    const ref= this.storage. ref(`${this.baseURL}/`);
     this.uploadTask= ref.child(upload.session.file.name).put(upload.session.file);
   this.uploadTask.snapshotChanges().pipe( finalize(()=>{ ref.child(upload.session.filename)
    .getDownloadURL().subscribe(fileURL=>{
      upload.session.fileUrl=fileURL;
      console.log(fileURL);

      // save to Database

      this.saveToDb(upload);
      this.snackBar.open('Session Added', 'OK', {duration: 2000})
      
    })
     
   })).subscribe();

  }
  
    
  private saveToDb(detailsTosave:any){
    this.db.list(`${this.dbBasePath}`).push(detailsTosave);
  }

  getSession(){
     return this.db.list(`${this.dbBasePath}/`).snapshotChanges().pipe(map(arr=>{
       return arr.map(res=>{
         return Object.values(res.payload.val());
       })

    }))
  }
}
