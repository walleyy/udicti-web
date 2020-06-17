import { AngularFireDatabase } from '@angular/fire/database';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  student:Boolean=true;
  subtitle="Incubatee"
  linkText="Or, coach"
  private userUrl= "/users-role"

  constructor(private route: Router, 
            private af:AngularFireAuth,
            private db:AngularFireDatabase) {
  }

  ngOnInit() {
  }

  login() {
    this.af.auth.signInWithEmailAndPassword(this.email, this.password).
    then(authState=>{ 
      //navigate programmatic to incubatee/coach

      if(this.student){
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


      console.log(authState)})
    .catch(error=>console.log(error));

  }

  toggle(){
    if(this.student){
      this.student=!this.student
      this.subtitle="Coach";
      this.linkText="Or, Incubatee";
      console.log(this.student);
    
    }
    else{
      this.student=!this.student
      this.subtitle="Incubatee";
      this.linkText="Or, Coach";
      console.log(this.student); 
    }

  }
  


  coachLogin() {
    this.route.navigate(['coach']);
  }


}
