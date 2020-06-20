import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';
 
export interface Credentials{
  email:string;
  password:any;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private userUrl= "/users-role"


  constructor( private route: Router, 
    private af:AngularFireAuth,
    private db:AngularFireDatabase) { }


  login(isStudent:boolean, credentials:Credentials){
    this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(authState=>{ 

      //saving the tokent to the localStorange
      localStorage.setItem('token', JSON.stringify(authState.user.getIdToken()));

      //navigate programmatic to incubatee/coach

      console.log(typeof(authState.user.getIdToken()));

      if(isStudent){
        // navigate to incubatee page

      this.db.list(`${this.userUrl}/` + authState.user.uid)
      .snapshotChanges()
      .pipe(map((arr)=>{
          return arr.map((res)=>Object.assign(res.payload.val(),{$key:res.key}))
      })).subscribe(snap=>{
                console.log(snap[0]['role']);
                if(snap[0]['role']=='applicant'){
                  this.route.navigate(['/pending', snap[0]['id']]);
                }
                else if(snap[0]['role']=='incubatee'){
                  this.route.navigate(['/incubatee', snap[0]['id']])
                }
              });  
              return;
      }
      //navigate to coachs page
      this.route.navigate(['/coach', authState.user.uid]);


      console.log(authState)})// end of then()
    .catch(error=>console.log(error));


  }

  logOut(){
    this.af.auth.signOut();
  }


}
