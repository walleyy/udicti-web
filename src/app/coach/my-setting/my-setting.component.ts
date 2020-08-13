import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { AngularFireAuth } from '@angular/fire/auth';

export interface UpdateProfile{
  name?: string;
  expertise?: string;
  location?:string;
  imageURL?: string
}

@Component({
  selector: 'app-my-setting',
  templateUrl: './my-setting.component.html',
  styleUrls: ['./my-setting.component.scss']
})
export class MySettingComponent implements OnInit {
  expertise_array: string[] = ['startupExp', 'accelerationExp', 'marketExp'];
  private coachPath='/coaches'
  private profilePhotoPath='/profilePhoto';
  private coachId:string;
  private nodeId;
  private fileName:string;
  private fileSize:string;
  private file:File;
  private uploadData:UpdateProfile;

  constructor(private db:AngularFireDatabase,
              private storage:AngularFireStorage,
              private af:AngularFireAuth,
              public dialog:MatDialog) { }

  ngOnInit() {
  this.coachId= localStorage.getItem('coachId');
    this.db.list(`${this.coachPath}/` + this.coachId).snapshotChanges()
       .pipe(map(arr=>{
           return arr.map(res=> res.key)
       }))
       .subscribe(snap=>{
         console.log(snap[0])
         this.nodeId= snap[0];
        })
  }

  deleteAccount(){
    const dailogRef=this.dialog.open(DialogDelete)
    dailogRef.afterClosed().subscribe(result=>{
      if(result)
        this.af.auth.currentUser.delete(); 
        console.log(result)});
  }

  updateProfile(f:NgForm){
   console.log(this.nodeId);
    this.uploadFile(this.file);
    this.uploadData={name:f.value.fullName, expertise:f.value.expertise, location: f.value.location};
    f.reset();
  }

  changePassword(form:NgForm){
    console.log(form.value);
    if(form.value.newPassword!==form.value.confirmedPassword){
      this.dialog.open(DialogContent);
    }
    if(form.value.newPassword){
    this.af.auth.currentUser.updatePassword(form.value.newPassword)
    }
    form.reset();
  }

  handleFiles(event:any){
    console.log(event);
    this.file= event.target.files[0];
 
  }

   private uploadFile(file:any){
     if(file){
    const ref= this.storage.ref(`${this.profilePhotoPath}/`);
    const uploadTask= ref.child(file.name).put(file);

    uploadTask.snapshotChanges().pipe(finalize(()=>{
      ref.child(file.name).getDownloadURL().subscribe(fileURL=>{
        console.log(fileURL);
        this.uploadData.imageURL=fileURL;
        //save to database
        this.saveToDb(this.uploadData);
      })

    })).subscribe();
    uploadTask.percentageChanges().subscribe(x=>{
      console.log(x);
    })

    }
  }

  private saveToDb(details:any){
    this.db.object(`${this.coachPath}/` + this.coachId + '/' + this.nodeId).update(details);

  }

}

@Component({
  selector:'dialog-content',
  template:`<h3><mat-icon color="red">announcement</mat-icon>Alert</h3>
  <p>Your passwords do not match!</p>
  <div mat-dialog-actions>
  <button mat-raised-button mat-dialog-close color="primary">Close</button>
  </div>`
})

export class DialogContent{}


@Component({
  selector:'dialog-delete-content',
  template:`<h3 mat-dialog-title><mat-icon color="red">announcement</mat-icon>Alert</h3>
  <p mat-dialog-content>Are you sure you want to delete your Account?</p>
  <div mat-dialog-actions align="end">
     <button mat-raised-button  color="primary" [mat-dialog-close]="false" cdkFocusInitial>Close</button>
     <button mat-raised-button [mat-dialog-close]="true" color="warn">Delete</button>  
  </div>`
})

export class DialogDelete{}
