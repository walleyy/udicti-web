import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


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

  constructor(private route: Router, private af:AngularFireAuth) {
  }

  ngOnInit() {
  }

  login() {
    this.af.auth.signInWithEmailAndPassword(this.email, this.password).
    then(authState=>{ 
      //navigate programmatic to incubatee/coach

      if(this.student){
        // navigate to incubatee page
        this.route.navigate(['/incubatee', authState.user.uid]);
        return
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
