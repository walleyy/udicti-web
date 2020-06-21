import { AngularFireDatabase } from '@angular/fire/database';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

export interface Credentials {
  email: string;
  password: any;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  }

  coachLogin() {
    this.route.navigate(['coach']);
  }


}
