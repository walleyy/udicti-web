import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServicesService} from '../../service/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './man-services.component.html',
  styleUrls: ['./man-services.component.css']
})
export class ManServicesComponent {

  services = [];
  editData = [];
  serviceFormGroup: FormGroup;
  editClicked = false;
  newLink: string;


  constructor(private formBuilder: FormBuilder,
              private servicesService: ServicesService) {
    this.initiateForm();
    this.getAllServices();
  }

  private initiateForm() {
    this.serviceFormGroup = this.formBuilder.group({
      heading: ['', [Validators.required, Validators.nullValidator]],
      details: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  addServices() {
    if (this.serviceFormGroup.valid === true) {
      const data = this.serviceFormGroup.value;
      console.log(data);
      this.servicesService.addService(data).then(value => {
        this.serviceFormGroup.reset();
        this.getAllServices();
      }).catch(error => {
        alert('Failed to add data');
      });
    } else {
      alert('Please enter all details');
    }
  }

  getAllServices() {
    this.servicesService.listServices().then(value => {
      this.services = value._embedded.services;
    }).catch(reason => {
      alert('Amegoma kuleta data');
    });
  }

  edit(pageId: string, link: string) {
    this.editClicked = true;
    const el = document.getElementById(pageId);
    el.scrollIntoView();
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    this.servicesService.fetchService(this.newLink).then(value => {
      console.log(value);
      this.editData = value;
    }).catch(reason => {
      alert('Amegoma kuleta data');
    });
  }

  cancel() {
    this.serviceFormGroup.reset();
    this.editClicked = false;
  }

  update() {
    this.editClicked = false;
    this.servicesService.updateService(this.newLink, this.serviceFormGroup.value).then(value => {
      this.serviceFormGroup.reset();
      this.getAllServices();
    }).catch(error => {
      alert('Failed to add data');
    });
  }

  delete(link: string) {
    this.editClicked = false;
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    if (confirm('Are you sure to delete ')) {
      this.servicesService.deleteService(this.newLink).then(value => {
        this.getAllServices();
      }).catch(error => {
        alert('Failed to add data');
      });
    }
  }

}
