import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public registrationForm: FormGroup;
  profileTab: number;

  constructor(private studentService: StudentService,
              private route: Router,
              private snackBar: MatSnackBar) {
    this.initiateForm();
  }

  private initiateForm() {
    this.registrationForm = new FormGroup({
      act_title: new FormControl('', [Validators.required]),
      act_details: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  regStudent() {
    const data = this.registrationForm.value;
    console.log(data);
    this.studentService.addStudent(data).then(value => {
      this.snackBar.open('Welcome to Udicti, Thanks for registering', 'Ok', {duration: 3000});
      this.route.navigate(['../login']);
      console.log(value);
    }).catch(error => {
      this.snackBar.open('Failed to add data', 'Ok', {duration: 2000});
      console.log(error);
    });
  }

  scroll(id: string) {
    this.profileTab = 2;
    const el = document.getElementById(id);
    el.scrollIntoView();
  }
}
