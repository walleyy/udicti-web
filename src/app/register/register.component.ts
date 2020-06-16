import { IncubateeDetails } from './../modal/incubateeData.modal';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {StudentService} from '../service/student.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AngularFireDatabase} from '@angular/fire/database';
import { distinctUntilChanged, combineLatest } from 'rxjs/operators';
import { merge} from 'rxjs';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private basePath='/applicant'
  public registrationForm: FormGroup;
  accept = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  panelOpenState = true;
  passwordsMisMatch:boolean= false;




  constructor(private studentService: StudentService,
              private route: Router,
              private snackBar: MatSnackBar,
              private db:AngularFireDatabase) {
    this.initiateForm();
  }


  public ngOnInit(){
 
  }

  private initiateForm() {
    this.registrationForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      phone_no: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required, this.passWordValidator.bind(this)]),
      college: new FormControl('', [Validators.required]),
      program: new FormControl('', [Validators.required]),
      businessIdea: new FormControl('', [Validators.required]),
      businessProblem: new FormControl('',[Validators.required]),
      businessValue: new FormControl('',[Validators.required]),
      businessMarket: new FormControl('',[Validators.required]),
      ideaCategory: new FormControl('',[Validators.required]),
      group: new FormControl('', [Validators.required]),
      stage: new FormControl('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  passWordValidator(group:FormGroup): ValidationErrors | null {
    let pass= group.value.password;
    let confirm= group.value.confirmPassword;
      return pass=== confirm ? null : { notSame: true} 
  }


 regStudent() {
    const incubateeData = this.registrationForm.value;
    console.log(this.registrationForm)
    console.log(incubateeData);

   var detailsToUpload= new IncubateeDetails(
     {
      firstname:incubateeData.firstname,
       lastname: incubateeData.lastname,
       degreeProgram:incubateeData.program,
      email:incubateeData.email,
      phone:incubateeData.phoneNumber },

     { business:incubateeData.businessIdea,
      shortDescription: incubateeData.businessProblem,
      group:incubateeData.group},
      {projectStage:incubateeData.stage},
      )

      if(incubateeData.password !==incubateeData.confirmPassword){
        this.snackBar.open('Password Mismatch', 'Ok', {duration: 2000})
        return; 
      }

    this.studentService.signUp(incubateeData.email, incubateeData.password)
    .then(authState=>{
      this.snackBar.open('Welcome to Udicti, Thanks for registering', 'Ok', {duration: 3000})
      detailsToUpload.userId= authState.user.uid;
      this.saveData(detailsToUpload,authState.user.uid);

      //navigate to login page
      this.route.navigate(['/login']);
    })
    .catch(error=>{
      console.log(error.message);
      
      this.snackBar.open('Failed try again ' + error.message, 'Ok', {duration: 2000})
    }
      );
  }

    private saveData(dataTosave:any, key:string){
      this.db.list(`${this.basePath}/`+key).push(dataTosave);
    }
}