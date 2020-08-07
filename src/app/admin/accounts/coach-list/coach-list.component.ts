import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatTableDataSource} from '@angular/material/table';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
// for table of coach
export interface PeriodicElement {
  name: string;
  ID: number;
  project: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, name: 'Hydrogen',  project: 'jjfd'},
  {ID: 2, name: 'Helium', project: 'He'},
  {ID: 3, name: 'Lithium', project: 'Li'},
  {ID: 4, name: 'Beryllium', project: 'Be'},
  {ID: 5, name: 'Boron',  project: 'B'},
  {ID: 6, name: 'Carbon',  project: 'C'},
  {ID: 7, name: 'Nitrogen',  project: 'N'},
  {ID: 8, name: 'Oxygen',  project: 'O'},
  {ID: 9, name: 'Fluorine',  project: 'F'},
  {ID: 10, name: 'Neon',  project: 'Ne'},
  {ID: 10, name: 'Neon',  project: 'Ne'},
  {ID: 10, name: 'Neon',  project: 'Ne'},
];

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent implements OnInit {
  coachData: FormGroup;
  constructor(
  ) { }
  expertise: string[] = ['startupExp', 'accelerationExp', 'marketExp'];
  image: ImageData;

  // @ViewChild('imageUpload', {static: false}) imageUpload: ElementRef; images  = [];
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  matcher = new MyErrorStateMatcher();
  // for table

  displayedColumns: string[] = ['ID', 'name', 'project'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  handleImage(event: any) {
    this.image = event.target.images[0];
    console.log(this.image);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.coachData = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      expertise: new FormControl('' , Validators.required),
      image: new FormControl('')
    });
  }

  getErrorMessage() {
    if (this.coachData.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.coachData.get('email').hasError('email') ? 'Not a valid email' : '';
  }

}
