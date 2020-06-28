import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private httpClient: HttpClient) { }

  listAccount(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.udicti.tk:8000/ide/api/services/').subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  fetchAccount(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  updateAccount(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, data).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  deleteAccount(url: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }
}
