import { ActivityService } from './../../service/activity.service';
import { ActivityDetails } from './../../modal/activityDetails.modal';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../service/student.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { delay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  public registrationForm: FormGroup;
  profileTab: number;
  filename='';
  file:File;
  activityDetails:ActivityDetails;
  key:string;
  percentage:number;
  barActive:boolean=false;

  constructor(private studentService: StudentService,
              private router: Router,
              private snackBar: MatSnackBar,
              private route : ActivatedRoute,
              private activityService:ActivityService,
              private authService:AuthService,
              private af:AngularFireAuth
           ) {
    this.initiateForm();
  }

  ngOnInit(){

    this.key= this.route.snapshot.paramMap.get('userId');
    console.log('userID',this.route.snapshot.paramMap.get('userId'));
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

  scroll(id: string) {
    this.profileTab = 2;
    const el = document.getElementById(id);
    el.scrollIntoView();
  }

//here we handing single files for the single activity
  handleFiles(event:any){
    console.log(event);
    if(event.target.files){
      this.file= event.target.files[0];
      this.filename=event.target.files[0].name
    
    } 
}

  onActivityAdd(){
  var data= this.registrationForm.value;
    this.activityDetails= new ActivityDetails({ activityTitle:data.act_title, 
      activityDescription: data.act_details, file:this.file }); 

    this.activityService.upload(this.activityDetails, this.key);
    this.activityService.getpercentageChange().subscribe(x=>{
      this.barActive= true;
      this.percentage= Math.round(x)
        // resetting form
      if(this.percentage===100){
        console.log('Hhere goes 100');
        this.registrationForm = new FormGroup({
          act_title: new FormControl(''),
          act_details: new FormControl('')
        });
        this.barActive=false;
      }
      console.log(x)
    });
  }


//logout method

logout(){
  this.authService.logOut();
  }

}
