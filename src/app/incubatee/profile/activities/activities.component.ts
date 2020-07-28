import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  images = [
    '../../assets/img/team/1.jpg',
    '../../assets/img/team/2.jpg',
    '../../assets/img/team/3.jpg',
    '../../assets/img/team/1.jpg',
    '../../assets/img/team/2.jpg',
    '../../assets/img/team/3.jpg',
  ];
  constructor() { }

  ngOnInit() {
  }

}
