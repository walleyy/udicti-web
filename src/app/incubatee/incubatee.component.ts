import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incubatee',
  templateUrl: './incubatee.component.html',
  styleUrls: ['./incubatee.component.css']
})
export class IncubateeComponent implements OnInit {
 approved = true;
  constructor() { }

  ngOnInit() {
  }

}
