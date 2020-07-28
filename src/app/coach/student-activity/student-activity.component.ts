import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-activity',
  templateUrl: './student-activity.component.html',
  styleUrls: ['./student-activity.component.scss']
})
export class StudentActivityComponent implements OnInit {
  activities = [
    {Name: 'Gift',
      Content: 'i have finish possible to create a hydroponic'
    },
    {Name: 'Gitto',
      Content: 'i want to add a robot in my system'
    },
    {Name: 'Bernard',
      Content: 'hello madame please upload my seesion of today'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
