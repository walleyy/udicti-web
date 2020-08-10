import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  ID: number;
  project: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, name: 'Halima', project: 'artificial intelligence'},
  {ID: 2, name: 'Husda', project: 'Aris 3'},
  {ID: 3, name: 'Angel', project: 'Water management system'},
  {ID: 4, name: 'Baraka',  project: 'mobile sdk'},
  {ID: 5, name: 'salim',  project: 'Agro-horticulture'},
  {ID: 6, name: 'Imaa',  project: 'DHIS3'},
  {ID: 7, name: 'meshack',  project: 'camera recognisin'},
  {ID: 8, name: 'Said',  project: 'building aid app'},
  {ID: 9, name: 'Flora',  project: 'social advise portal'},
  {ID: 10, name: 'Naomi', project: 'bar implementation'},
  {ID: 10, name: 'Nura',  project: 'DHIS3'},
  {ID: 10, name: 'Noani',  project: 'Aris3'},
];

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['position', 'name', 'projectName', 'Manage'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
  }

}