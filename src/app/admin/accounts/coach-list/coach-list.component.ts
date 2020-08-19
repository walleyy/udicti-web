import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit} from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import {map}  from 'rxjs/operators'
import {MatSnackBar} from '@angular/material';


export interface Coach{
  name: string,
  expertise:string,
  email: string,
  role: string;
  imageUrl?: string,
  coachID?: string;
  deleteUser:false;
}

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent implements OnInit {
  coachData: FormGroup;
  private coachPath='/coaches';
  private coachRolePath='coach-role'
  coach_array: any[]=[];

  

  constructor(private auth:AngularFireAuth,
             private db:AngularFireDatabase,
             private snackBar: MatSnackBar) { }
  expertise: string[] = ['startupExp', 'accelerationExp', 'marketExp'];
  image: ImageData;

  handleImage(event: any) {
    this.image = event.target.images[0];
    console.log(this.image);
  }
  
  ngOnInit() {
   this.initiliazeForm()
    this.db.list(`${this.coachPath}/`).snapshotChanges().pipe(map(res=>{ 
      return res.map(data=> Object.assign(Object.values(data.payload.val()), {key:data.key}))

    })).subscribe(res=>{
      this.coach_array=[];
      res.map(element=>{
        console.log('element',element)
        if(element[0]['role']==='admin') return;
        this.coach_array.push(element[0]);
      })
      console.log('coach array',this.coach_array);
    })
  }

  getErrorMessage() {
    if (this.coachData.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.coachData.get('email').hasError('email') ? 'Not a valid email' : '';
  }


  addCoach(){

    this.auth.auth.createUserWithEmailAndPassword(this.coachData.value.email, '123456').then(authState=>{
      console.log(authState.user.uid);
      if(authState){
        let coachData= this.coachData.value
        let coach:Coach={
          name: coachData.name,
          expertise: coachData.expertise,
          role: 'coach',
          email: coachData.email,
          coachID: authState.user.uid,
          deleteUser:false
          
        }



        console.log(coach);
      
      this.db.list(`${this.coachPath}/` + authState.user.uid).push(coach);
   
      this.snackBar.open('Coach added', 'OK!', {duration: 2000})
      this.initiliazeFormWithNoValidator();
      }
    }).catch(error=>{
          this.snackBar.open(error, 'OK', {duration: 3000})
    })

    
  }

 deleteCoach(coach:any){

    console.log('COACH', coach.coachID);
 this.db.list(`${this.coachPath}/`+ coach.coachID).snapshotChanges().pipe(map(arr=>{
     return arr.map(res=>{
       return res.key;
      })
    })).subscribe(nodeKey=>{
         this.db.object(`${this.coachPath}/` + coach.coachID + '/' + nodeKey[0]).update({deleteUser:true})
         this.snackBar.open('Deleted', 'OK', {duration: 2000});
    })

    //this.db.object(`${this.coachPath}/` + coach)



   
  }

  private initiliazeForm(){
    this.coachData = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      expertise: new FormControl('' , Validators.required),
      imageURL: new FormControl('')
    });
  }

  private initiliazeFormWithNoValidator(){
    this.coachData = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      expertise: new FormControl(''),
      imageURL: new FormControl('')
    });

  }
 

}
