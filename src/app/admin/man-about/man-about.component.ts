import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AboutService} from '../../service/about.service';

@Component({
  selector: 'app-man-about',
  templateUrl: './man-about.component.html',
  styleUrls: ['./man-about.component.scss']
})
export class ManAboutComponent {
  abouts = [];
  editData = [];
  apiFormGroup: FormGroup;
  editClicked = false;
  newLink: string;
  Details = String;
  time = [];

  constructor(private formBuilder: FormBuilder,
              private aboutService: AboutService) {
    this.initiateForm();
    this.getAllAbouts();
  }

  private initiateForm() {
    this.apiFormGroup = this.formBuilder.group({
      time: ['', [Validators.required, Validators.nullValidator]],
      heading: ['', [Validators.required, Validators.nullValidator]],
      image: ['', [Validators.required, Validators.nullValidator]],
      details: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  addAbouts() {
    if (this.apiFormGroup.valid === true) {
      const data = this.apiFormGroup.value;
      console.log(data);
      this.aboutService.addAbout(data).then(value => {
        this.apiFormGroup.reset();
        this.getAllAbouts();
      }).catch(error => {
        alert('Failed to add data');
      });
    } else {
      alert('Please enter all details');
    }
  }

  getAllAbouts() {
    this.aboutService.listAbouts().then(value => {
      console.log(value);
      this.abouts = value._embedded.abouts;
    }).catch(reason => {
      alert('Amegoma kuleta data');
    });
  }

  edit(pageId: string, link: string) {
    this.editClicked = true;
    const el = document.getElementById(pageId);
    el.scrollIntoView();
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    this.aboutService.fetchAbout(this.newLink).then(value => {
      console.log(value);
      this.editData = value;
    }).catch(reason => {
      alert('Amegoma kuleta data');
    });
  }

  cancel() {
    this.apiFormGroup.reset();
    this.editClicked = false;
  }

  update() {
    this.editClicked = false;
    this.aboutService.updateAbout(this.newLink, this.apiFormGroup.value).then(value => {
      this.apiFormGroup.reset();
      this.getAllAbouts();
    }).catch(error => {
      alert('Failed to add data');
    });
  }

  delete(link: string) {
    this.editClicked = false;
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    if (confirm('Are you sure to delete ')) {
      this.aboutService.deleteAbout(this.newLink).then(value => {
        this.getAllAbouts();
      }).catch(error => {
        alert('Failed to add data');
      });
    }
  }

}
