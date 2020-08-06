import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent implements OnInit {
  constructor(
  ) { }
  expertise: string[] = ['startupExp', 'accelerationExp', 'marketExp'];
  image: ImageData;

  @ViewChild('imageUpload', {static: false}) imageUpload: ElementRef; images  = [];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  typeFormcontrol = new FormControl([
    Validators.required,
  ]);

  handleImage(event: any) {
    this.image = event.target.images[0];
    console.log(this.image);
  }

  ngOnInit() {
  }

}
