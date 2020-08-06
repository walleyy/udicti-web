import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../service/project.service';
import {MatDialog, MatTable} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';

export interface UsersData {
  name: string;
  id: number;
  stage: string;
}
const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence', stage: 'finished'},
  {id: 1560608796014, name: 'Machine Learning', stage: 'unfinished' },
  {id: 1560608787815, name: 'Robotic Process Automation', stage: 'unfinished' },
  {id: 1560608805101, name: 'Blockchain', stage: 'unfinished'}
];

@Component({
  selector: 'app-man-projects',
  templateUrl: './man-projects.component.html',
  styleUrls: ['./man-projects.component.scss']
})
export class ManProjectsComponent {

  projects = [];
  editData = [];
  projectFormGroup: FormGroup;
  editClicked = false;
  newLink: string;

  // project table
  displayedColumns: string[] = ['id', 'name', 'stage', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              public dialog: MatDialog,
              ) {
    // this.initiateForm();
    // this.getAllProjects();
    this.editClicked = false;
  }

  // private initiateForm() {
  //   this.projectFormGroup = this.formBuilder.group({
  //     name: ['', [Validators.required, Validators.nullValidator]],
  //     details: ['', [Validators.required, Validators.nullValidator]]
  //   });
  // }

  // addProjects() {
  //   if (this.projectFormGroup.valid === true) {
  //     const data = this.projectFormGroup.value;
  //     console.log(data);
  //     this.projectService.addProject(data).then(value => {
  //       this.projectFormGroup.reset();
  //       this.getAllProjects();
  //     }).catch(error => {
  //       alert('Failed to add data');
  //     });
  //   } else {
  //     alert('Please enter all details');
  //   }
  // }
  //
  // getAllProjects() {
  //   this.projectService.listProjects().then(value => {
  //     this.projects = value._embedded.projects;
  //   }).catch(reason => {
  //     alert('Amegoma kuleta data');
  //   });
  // }
  //
  // edit(pageId: string, link: string) {
  //   this.editClicked = true;
  //   const el = document.getElementById(pageId);
  //   el.scrollIntoView();
  //   this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
  //   this.projectService.fetchProject(this.newLink).then(value => {
  //     console.log(value);
  //     this.editData = value;
  //   }).catch(reason => {
  //     alert('Amegoma kuleta data');
  //   });
  // }

  // cancel() {
  //   this.projectFormGroup.reset();
  //   this.editClicked = false;
  // }

  // update() {
  //   this.editClicked = false;
  //   this.projectService.updateProject(this.newLink, this.projectFormGroup.value).then(value => {
  //     this.projectFormGroup.reset();
  //     this.getAllProjects();
  //   }).catch(error => {
  //     alert('Failed to add data');
  //   });
  // }

  // delete(link: string) {
  //   this.editClicked = false;
  //   this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
  //   if (confirm('Are you sure to delete ')) {
  //     this.projectService.deleteProject(this.newLink).then(value => {
  //       this.getAllProjects();
  //     }).catch(error => {
  //       alert('Failed to add data');
  //     });
  //   }
  // }

  // uploading with mat dialog
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }
  // tslint:disable-next-line:variable-name
  addRowData(row_obj) {
    const d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name,
      stage: row_obj.stage,
    });
    this.table.renderRows();

  }
  // tslint:disable-next-line:variable-name
  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }
  // tslint:disable-next-line:variable-name
  deleteRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      return value.id !== row_obj.id;
    });
  }


}
