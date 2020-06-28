import {Component, OnInit} from '@angular/core';
import {AccountsService} from '../service/accounts.service';
import {AboutService} from '../service/about.service';
import {ProjectService} from '../service/project.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullNav = true;
  projects = [];
  abouts = [];
  services = [];
  images = [
    '../../assets/img/team/1.jpg',
    '../../assets/img/team/2.jpg',
    '../../assets/img/team/3.jpg',
    '../../assets/img/team/1.jpg',
    '../../assets/img/team/2.jpg',
    '../../assets/img/team/3.jpg',
  ];
  contactForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  phonePattern = '[0-9]{0-10}';
  slideConfig = {
    slidesToShow: 3, slidesToScroll: 1, autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
    variableWidth: true,
    dots: true
  };
  manualProjects = [{
    name: 'AgroLenz',
    details: 'AgroLenz is a technological solution that enables the easy recognition of diseases and pastes that affect crops.',
    image: '../../assets/img/projects/agrolenz.jpeg'
  }, {
    name: 'Kilimo Taarifa ',
    details: 'Kilimo Taarifa is a mobile platform that use USSD & SMS technology to provide an interlink between a farmer, ' +
      'buyer and agricultural researchers in such a way that it facilitates the whole agriculture marketing process.',
    image: '../../assets/img/projects/kilimoTaarifa.png'
  }, {
    name: 'Mobile Kibubu',
    details: 'Commitment,Creativity,Credibility.',
    image: '../../assets/img/projects/kibubu.png'
  }, {
    name: 'Nafaka',
    details: 'Commitment,Creativity,Credibility.',
    image: '../../assets/img/projects/nafaka.png'
  }, {
    name: 'Innovation Square',
    details: 'This is the home of Innovators, we invent solutions, we have patents covering different sectors.',
    image: '../../assets/img/projects/innovationSquare.png'
  }];

  constructor(private accountService: AccountsService,
              private projectService: ProjectService,
              private snackBar: MatSnackBar,
              private aboutService: AboutService,
              private formBuilder: FormBuilder) {
    this.initiateForm();
    this.getAllAboutUs();
    this.getAllAccounts();
    this.getAllProjects();
  }

  ngOnInit() {

  }


  private initiateForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.nullValidator]],
      email: ['', [Validators.required, Validators.nullValidator, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required, Validators.nullValidator, Validators.pattern(this.phonePattern)]],
      message: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  getAllAboutUs() {
    this.aboutService.listAbouts().then(value => {
      this.abouts = value._embedded.abouts;
    }).catch(reason => {
      this.snackBar.open('Failed to load data', 'Ok', {duration: 2000});
      console.log(reason);
    });
  }

  getAllAccounts() {
    this.accountService.listAccount().then(value => {
      this.services = value._embedded.services;
    }).catch(reason => {
      this.snackBar.open('Failed to load data', 'Ok', {duration: 2000});
      console.log(reason);
    });
  }

  getAllProjects() {
    this.projectService.listProjects().then(value => {
      this.projects = value._embedded.projects;
    }).catch(reason => {
      this.snackBar.open('Failed to load data', 'Ok', {duration: 2000});
      console.log(reason);
    });
  }

}
