import { AngularFireDatabase } from '@angular/fire/database';
import { NotificationService } from './../../service/notification.service';
import { SessionService } from './../../service/session.service';
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
import {MatTableDataSource} from '@angular/material/table';
import { map }  from 'rxjs/operators'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
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
  table_array: any[]= [];
  session_array:any []= [];
  displayedColumns:string[];
  notification_array: any[]=[]
  notificationNumber:number=0;
  dataSource;
  private incubateeCoachPath='/incubatee-coach';
  private incubateeId:string;
  public bioName:string;
  public bioCollege:string;
  public bioPhoneNumber?:string;
  public bioProjectTitle:string;


  constructor(private studentService: StudentService,
              private router: Router,
              private snackBar: MatSnackBar,
              private route : ActivatedRoute,
              private activityService:ActivityService,
              private authService:AuthService,
              private af:AngularFireAuth,
              private sessionService: SessionService,
              private notificationService:NotificationService,
              private db: AngularFireDatabase
           ) {
    this.initiateForm();

    this.incubateeId=this.route.snapshot.paramMap.get('userId');

    this.db.list(`${this.incubateeCoachPath}/`).snapshotChanges().pipe(map(arr=>{
      return arr.map(res=>{
        return Object.assign(res.payload.val(), {key:res.key})
      })
 }))
 .subscribe(snap=>{
   
   snap.map(data=>{
     if(data['userID']===this.incubateeId){
       this.bioName=data['name'];
       this.bioProjectTitle= data['projectName'];
       this.bioPhoneNumber= data['phoneNumber'];
       this.bioCollege= data['college'];
     }
   })
 })
  }

 ngOnInit() {

   localStorage.setItem('key', this.route.snapshot.paramMap.get('userId'));

   console.log('userID', this.route.snapshot.paramMap.get('userId'));
   this.sessionService.getSession().subscribe( res => {
     // tslint:disable-next-line:variable-name
       const data_array: any[] = res;
       let count = 0;
       data_array.forEach(data => {
          data.forEach(element => {
           count++;
           this.table_array.push({position: count, name: element.filename, Date: element.sessionDate, URL: element.fileUrl});
           this.session_array.push(element);

          });

        });

       this.displayedColumns = ['position', 'name', 'Date', 'URL', 'PostedBy'];
       this.dataSource = new MatTableDataSource(this.table_array);
       console.log(this.table_array);
       console.log('session', this.session_array);

        }); // end of subcription

        
        //pulling the nofication table

        this.notificationService.getNotification().subscribe(res=>{
   
           res.forEach(element=>{
             this.notification_array=[];
             if (element['notificationType']==="private"){
               this.notification_array.push(element)  
             }

             this.notificationNumber=this.notification_array.length;
           })

           console.log("private", this.notification_array);
        }) //end

     

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private initiateForm() {
    this.registrationForm = new FormGroup({
      act_title: new FormControl('', [Validators.required]),
      act_details: new FormControl('', [Validators.required]),
      act_date: new FormControl('', [Validators.required])
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

// here we handing single files for the single activity
  handleFiles(event: any) {
    console.log(event);
    if (event.target.files) {
      this.file = event.target.files[0];
      this.filename = event.target.files[0].name;

    }
}

  onActivityAdd() {
  const data = this.registrationForm.value;
  console.log(data);
  this.activityDetails = new ActivityDetails({ activityTitle: data.act_title,
      activityDescription: data.act_details, date: new Date().toLocaleString(), file: this.file, filename: this.filename });

  this.activityService.upload(this.activityDetails);
  this.activityService.getpercentageChange().subscribe(x => {
      this.barActive = true;
      this.percentage = Math.round(x);
        // resetting form
      if (this.percentage === 100) {
        console.log('Hhere goes 100');
        this.registrationForm = new FormGroup({
          act_title: new FormControl(''),
          act_details: new FormControl('')
        });
        this.barActive = false;
        this.filename = '';
      }
      console.log(x);
    });
  }


// logout method

logout() {
  this.authService.logOut();
  }


}
