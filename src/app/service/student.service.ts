import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private httpClient: HttpClient, /* step 2 we create Student,  step 3 */
    private af:AngularFireAuth,
    ) {
  }

  addStudent(data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://api.udicti.tk:8000/ide/api/students', data).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  //sign-in to firebases
  signUp(email:string, password:string){
   return this.af.auth.createUserWithEmailAndPassword(email,password);
  }
  
  



  listStudents(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://api.udicti.tk:8000/ide/api/students/').subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  fetchStudent(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url).subscribe(value => {
        resolve(value);
      }, er => {
        reject(er);
      });
    });
  }

  updateStudent(url: string, data: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, data).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }

  deleteStudent(url: string) {
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url).subscribe(value => {
        resolve(value);
      }, error => {
        reject(error);
      });
    });
  }
}
