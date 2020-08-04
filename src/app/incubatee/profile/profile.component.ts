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


export interface PeriodicElement {
  name: string;
  position: number;
  Date: number;
  PostedBy: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', Date: 1.0079, PostedBy: 'H'},
  {position: 2, name: 'Helium', Date: 4.0026, PostedBy: 'He'},
  {position: 3, name: 'Lithium', Date: 6.941, PostedBy: 'Li'},
  {position: 4, name: 'Beryllium', Date: 9.0122, PostedBy: 'Be'},
  {position: 5, name: 'Boron', Date: 10.811, PostedBy: 'B'},
  {position: 6, name: 'Carbon', Date: 12.0107, PostedBy: 'C'},
  {position: 7, name: 'Nitrogen', Date: 14.0067, PostedBy: 'N'},
  {position: 8, name: 'Oxygen', Date: 15.9994, PostedBy: 'O'},
  {position: 9, name: 'Fluorine', Date: 18.9984, PostedBy: 'F'},
  {position: 10, name: 'Neon', Date: 20.1797, PostedBy: 'Ne'},
];

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

   localStorage.setItem('key',this.route.snapshot.paramMap.get('userId'));

    console.log('userID',this.route.snapshot.paramMap.get('userId'));
  }


  displayedColumns: string[] = ['position', 'name', 'Date', 'PostedBy'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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
  console.log(data);
    this.activityDetails= new ActivityDetails({ activityTitle:data.act_title, 
      activityDescription: data.act_details, date: new Date().toLocaleString(), file:this.file, filename:this.filename }); 

    this.activityService.upload(this.activityDetails);
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
        this.filename='';
      }
      console.log(x)
    });
  }


//logout method

logout(){
  this.authService.logOut();
  }

}
