import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private httpClient: HttpClient /* step 2 we create service,  step 3 */) {
  }

  addAbout(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://api.udicti.tk:8000/ide/api/abouts', data).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  listAbouts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.udicti.tk:8000/ide/api/abouts/').subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  fetchAbout(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  updateAbout(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, data).subscribe(value => {
      resolve(value);
    }, error => {
      reject(error);
    });
  });
  }

  deleteAbout(url: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }
}
