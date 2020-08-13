import { AngularFireDatabase } from '@angular/fire/database';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface Credentials {
  email: string;
  password: any;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginData: FormGroup;
  email: string;
  password: string;
  credentials: Credentials;
  isStudent = true;
  subtitle = 'Incubatee';
  linkText = 'Or, coach';
  private userUrl = '/users-role';

  constructor(private route: Router,
              private af: AngularFireAuth,
              private db: AngularFireDatabase,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.LoginData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('' , Validators.required),
    });

  }

  login() {
      this.credentials = {email: this.email, password: this.password};
      this.authService.login(this.isStudent, this.credentials);
  }

  toggle() {
    if (this.isStudent) {
      this.isStudent = !this.isStudent;
      this.subtitle = 'Coach';
      this.linkText = 'Or, Incubatee';
      console.log(this.isStudent);

    } else {
      this.isStudent = !this.isStudent;
      this.subtitle = 'Incubatee';
      this.linkText = 'Or, Coach';
      console.log(this.isStudent);
    }
    this.af.auth.signInWithEmailAndPassword(this.email, this.password).
    then(authState => console.log(authState))
    .catch(error => console.log(error));

  }

  coachLogin() {
    this.route.navigate(['coach']);
  }
  getErrorMessage() {
    if (this.LoginData.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.LoginData.get('email').hasError('email') ? 'Not a valid email' : '';
  }

}
