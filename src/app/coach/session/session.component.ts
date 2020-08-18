import { AngularFireDatabase } from '@angular/fire/database';
import { SessionService } from './../../service/session.service';
import { Session } from './../../modal/session.modal';
import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import {CoachUploadService } from '../../service/coach-upload.service';
import {MatDialog, MatTable} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  boolean = true;
  session_array:any[]=[];
  public sessionForm: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'description', 'date', 'file'];
  dataSource: MatTableDataSource<any>;
  file: File;
  filename = '';
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files  = [];
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private uploadService: CoachUploadService,
    public dialog: MatDialog,
    private sessionService: SessionService
  ) {
    this.initiateForm();
  }

  private initiateForm() {
    this.sessionForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])

    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.sessionForm.controls[controlName].hasError(errorName);
  }


  handleFiles(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  uploadSession() {
    const data = this.sessionForm.value;
    const upload = new Session({ sessionName: data.name,
      sessionDescription: data.description,
      sessionDate: new Date().toLocaleString(),
       file: this.file,
       filename: this.file.name
      });

    this.sessionService.uploadSession(upload);

  }


  ngOnInit() {

    this.sessionService.getSession().subscribe(snap=>{

      this.session_array=[];
      var count:number=0;
        snap.forEach(element=>{
          element.forEach(data=>{
            count++;
            this.session_array.push({position:count, name: data['sessionName'], 
            description: data['sessionDescription'], file: data['filename'], fileURL:data['fileUrl'], date: data['sessionDate']})
  
          })
         
        })
     this.session_array= this.session_array.sort((a,b):any=>{ a.date < b.date ? -1 : a.date > b.date ? 1 : 0})

      this.dataSource = new MatTableDataSource(this.session_array);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log('this array', this.session_array);
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



