import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {reject} from 'q';

@Injectable({
  providedIn: 'root'
})
export class ExampleApiService {

  constructor(private httpClient: HttpClient /* step 2 we create service,  step 3 */) {
  }

  addData(data: any) {
    this.httpClient.post('http://ssm.fahamutech.com:8000/ide/api/projects', data).subscribe(value => {
      console.log(value);
    }, error => {
      console.log(error);
    });
  }

  listrojects(): Promise<any> {
    return new Promise((resolve, rject) => {
      this.httpClient.get('http://ssm.fahamutech.com:8000/ide/api/projects').subscribe(value => {
        resolve(value);
      }, er => {
        rject(er);
      });
    });
  }

  updateProject(id: string, data: any) {
    this.httpClient.patch('http://ssm.fahamutech.com:8000/ide/api/projects/' + id, data).subscribe(value => {
      console.log(value);
    }, eror => {
      console.log(eror);
    });
  }

  deleteProject(id: string) {
    this.httpClient.delete('http://ssm.fahamutech.com:8000/ide/api/projects/ ' + id).subscribe(value => {
      console.log(value);
    }, eror => {
      console.log(eror);
    });
  }
}
