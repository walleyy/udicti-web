import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incubatee-timeline',
  templateUrl: './incubatee-timeline.component.html',
  styleUrls: ['./incubatee-timeline.component.scss']
})
export class IncubateeTimelineComponent implements OnInit {
  activities = [
    {Name: 'Gift',
      Content: 'i have finish possible to create a hydroponic'
    },
    {Name: 'Gift',
      Content: 'i want to add a robot in my system'
    },
    {Name: 'Gift',
      Content: 'hello madame please upload my seesion of today'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
