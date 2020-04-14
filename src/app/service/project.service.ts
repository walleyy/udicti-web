import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient /* step 2 we create project,  step 3 */) {
  }

  addProject(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://api.udicti.tk:8000/ide/api/projects', data).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  listProjects(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.udicti.tk:8000/ide/api/projects/').subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  fetchProject(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  updateProject(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, data).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  deleteProject(url: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }
}
