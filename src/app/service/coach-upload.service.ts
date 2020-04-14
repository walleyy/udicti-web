import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import {map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachUploadService {
  SERVER_URL = 'https://file.io/';
  constructor(private httpClient: HttpClient) { }
  public upload(formData) {

    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
