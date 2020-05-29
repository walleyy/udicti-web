import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../service/student.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registrationForm: FormGroup;
  accept = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  panelOpenState = true;

  constructor(private studentService: StudentService,
              private route: Router,
              private snackBar: MatSnackBar) {
    this.initiateForm();
  }

  private initiateForm() {
    this.registrationForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      phone_no: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      college: new FormControl('', [Validators.required]),
      program: new FormControl('', [Validators.required]),
      stage: new FormControl('', [Validators.required])
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
    }).catch(error => {
      this.snackBar.open('Failed to add data', 'Ok', {duration: 2000});
    });
  }
}
