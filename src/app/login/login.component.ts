import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private route: Router, private af: AngularFireAuth) {
  }

  ngOnInit() {
  }

  login() {
    this.af.auth.signInWithEmailAndPassword(this.email, this.password).
    then(authState => console.log(authState))
    .catch(error => console.log(error));

  }
  coachLogin() {
    this.route.navigate(['coach']);
  }

}
