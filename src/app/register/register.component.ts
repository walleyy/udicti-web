import { IncubateeDetails } from '../modal/incubateeData.modal';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {StudentService} from '../service/student.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { AngularFireDatabase} from '@angular/fire/database';
import { X } from '@angular/cdk/keycodes';

export interface User{
  name:String;
  email:string;
  phoneNumber:string;
  date:string;
}

export interface Application{
  name:string;
  projectName:string;
  date: string;
  userID?: string;
  nodeID?:string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private basePath='/applicant';
  private userPath= '/users-role';
  private toUsersPath='/users';
  private applicationPath='/application';
  public registrationForm: FormGroup;
  accept = false;
  Roles: any = ['Admin', 'Author', 'Reader'];
  panelOpenState = true;
  passwordsMisMatch = false;

  constructor(private studentService: StudentService,
              private route: Router,
              private snackBar: MatSnackBar,
              private db: AngularFireDatabase) {
    this.initiateForm();
  }

  public ngOnInit() {

  }

  private initiateForm() {
    this.registrationForm = new FormGroup({
      firstname: new FormControl ('', [Validators.required]),
      lastname: new FormControl ('', [Validators.required]),
      gender: new FormControl ('', [Validators.required]),
      year: new FormControl ('', [Validators.required]),
      phoneNumber: new FormControl ('', [Validators.required]),
      phone_no: new FormControl ('', [Validators.required]),
      email: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, this.passWordValidator.bind(this)]),
      college: new FormControl ('', [Validators.required]),
      program: new FormControl ('', [Validators.required]),
      businessIdea: new FormControl ('', [Validators.required]),
      businessProblem: new FormControl ('', [Validators.required]),
      businessValue: new FormControl ('', [Validators.required]),
      businessMarket: new FormControl ('', [Validators.required]),
      ideaCategory: new FormControl ('', [Validators.required]),
      group: new FormControl ('', [Validators.required]),
      stage: new FormControl ('', [Validators.required])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  passWordValidator(group: FormGroup): ValidationErrors | null {
    const pass = group.value.password;
    const confirm = group.value.confirmPassword;
    return pass === confirm ? null : { notSame: true};
  }

 regStudent() {
    const incubateeData = this.registrationForm.value;
    console.log(this.registrationForm);
    console.log(incubateeData);

   const detailsToUpload = new IncubateeDetails(
     {
      firstname: incubateeData.firstname,
       lastname: incubateeData.lastname,
       degreeProgram: incubateeData.program,
      email: incubateeData.email,
      phone: incubateeData.phoneNumber },

     { business: incubateeData.businessIdea,
      shortDescription: incubateeData.businessProblem,
      group: incubateeData.group},
      {projectStage: incubateeData.stage},
      );

      const detailsToUsers:User={
        name: this.registrationForm.value.firstname + "" + this.registrationForm.value.lastname,
        email: this.registrationForm.value.email,
        phoneNumber:this.registrationForm.value.phoneNumber,
        date: new Date().toLocaleString()
      };

      const application:Application={
        name: this.registrationForm.value.firstname + "" + this.registrationForm.value.lastname,
        date: new Date().toLocaleString(),
        projectName: this.registrationForm.value.businessIdea,
      }

    if (incubateeData.password !== incubateeData.confirmPassword) {
        this.snackBar.open('Password Mismatch', 'Ok', {duration: 2000});
        return;
      }

    this.studentService.signUp(incubateeData.email, incubateeData.password)
    .then(authState=>{
      this.snackBar.open('Welcome to Udicti, Thanks for registering', 'Ok', {duration: 3000})
      detailsToUpload.userId= authState.user.uid;
      detailsToUpload.userRole= 'applicant';
      application.userID= authState.user.uid;
      this.saveData(detailsToUpload,authState.user.uid);// to applicant node
      this.saveToUser(detailsToUsers) // to users node
      this.saveToApplication(application) // to application node

      // navigate to login page
      this.route.navigate(['/login']);
    })// end of then()
    
    .catch(error=>{
      console.log(error.message);

      this.snackBar.open('Failed try again ' + error.message, 'Ok', {duration: 2000});
    }
      );
  }
     //This  method save to data to the database
    private saveData(dataTosave:any, key:string){
      this.db.list(`${this.basePath}/`).push(dataTosave).then(data=>{
        this.db.list(`${this.userPath}/` +key).push({role:"applicant", applicantID:data.key, userID:key, deleteUser:false}).then(x=>{
          this.db.object(`${this.userPath}/` + key + '/' + x.key).update({nodeID: x.key})
        })
      })
    }

    private saveToUser(detailsToUser:User){
      this.db.list(`${this.toUsersPath}/`).push(detailsToUser);  
    }

    private saveToApplication(application:Application){
      this.db.list(`${this.applicationPath}`).push(application).then(x=>{
        this.db.object(`${this.applicationPath}/`+ x.key).update({nodeID:x.key});
      })
    }
    
}
