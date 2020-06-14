import { IncubateeDetails } from './../modal/incubateeData.modal';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../service/student.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AngularFireDatabase} from '@angular/fire/database';

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
              private snackBar: MatSnackBar,
              private db:AngularFireDatabase) {
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
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      college: new FormControl('', [Validators.required]),
      program: new FormControl('', [Validators.required]),
      stage: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  regStudent() {
    const incubateeData = this.registrationForm.value;
    console.log(incubateeData);

    var detailsToUpload= new IncubateeDetails({
      firstname:this.registrationForm.firstname,
       lastname:this.registrationForm.lastname,
       degreeProgram:this.registrationForm.program,
      email:this.registrationForm.email,
    phone:this.registrationForm.phoneNumber},
    business:this.registrationForm.)
    this.studentService.signUp(incubateeData.email, incubateeData.password)
    .then(authState=>{
      authState.user.

    })
    .catch(error=>console.log(error));
 
    /*  this.snackBar.open('Welcome to Udicti, Thanks for registering', 'Ok', {duration: 3000});
      this.route.navigate(['../login']);
    }).catch(error => {
      this.snackBar.open('Failed to add data', 'Ok', {duration: 2000});
    });*/
  }
}