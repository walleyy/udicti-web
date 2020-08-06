import { SessionService } from './../../service/session.service';
import { Session } from './../../modal/session.modal';
import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {CoachUploadService } from '../../service/coach-upload.service';
import {DialogBoxComponent} from '../../dialog-box/dialog-box.component';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {MatDialog, MatTable} from '@angular/material';

export interface UsersData {
  name: string;
  id: number;
}


const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'}
];
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  boolean = true;
  public sessionForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = ELEMENT_DATA;
  file: File;
  filename = '';
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files  = [];
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

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

  getSession() {
    console.log('clicked');
    console.log(this.sessionForm.value);

  }
  // uploading with mat dialog
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  // tslint:disable-next-line:variable-name
  addRowData(row_obj) {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name
    });
    this.table.renderRows();

  }
  // tslint:disable-next-line:variable-name
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }
  // tslint:disable-next-line:variable-name
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
  }
// on pending application
  inc() {
    this.boolean = false;
  }

  ngOnInit() {
  }

}
