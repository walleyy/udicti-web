import { Component, OnInit,  ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { HttpEventType, HttpErrorResponse} from '@angular/common/http';
import {of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {CoachUploadService } from '../service/coach-upload.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {
  @ViewChild('fileUpload', {static: false}) fileUpload: ElementRef; files  = [];
  private sessionForm: FormGroup;
  profileTab: number;
  constructor(private route: Router,
              private snackBar: MatSnackBar,
              private uploadService: CoachUploadService) {
    this.initiateForm();
  }

  private initiateForm() {
    this.sessionForm = new FormGroup({
      session_title: new FormControl('', [Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.sessionForm.controls[controlName].hasError(errorName);
  }
  scroll(id: string) {
    this.profileTab = 2;
    const el = document.getElementById(id);
    el.scrollIntoView();
  }
  uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }
  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }
  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0});
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }
  getSession() {

  }
  ngOnInit() {
  }
}
