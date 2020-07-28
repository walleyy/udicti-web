import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../service/project.service';

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


  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService) {
    this.initiateForm();
    this.getAllProjects();
  }

  private initiateForm() {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.nullValidator]],
      details: ['', [Validators.required, Validators.nullValidator]]
    });
  }

  addProjects() {
    if (this.projectFormGroup.valid === true) {
      const data = this.projectFormGroup.value;
      console.log(data);
      this.projectService.addProject(data).then(value => {
        this.projectFormGroup.reset();
        this.getAllProjects();
      }).catch(error => {
        alert('Failed to add data');
      });
    } else {
      alert('Please enter all details');
    }
  }

  getAllProjects() {
    this.projectService.listProjects().then(value => {
      this.projects = value._embedded.projects;
    }).catch(reason => {
      alert('Amegoma kuleta data');
    });
  }

  edit(pageId: string, link: string) {
    this.editClicked = true;
    const el = document.getElementById(pageId);
    el.scrollIntoView();
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    this.projectService.fetchProject(this.newLink).then(value => {
      console.log(value);
      this.editData = value;
    }).catch(reason => {
      alert('Amegoma kuleta data');
    });
  }

  cancel() {
    this.projectFormGroup.reset();
    this.editClicked = false;
  }

  update() {
    this.editClicked = false;
    this.projectService.updateProject(this.newLink, this.projectFormGroup.value).then(value => {
      this.projectFormGroup.reset();
      this.getAllProjects();
    }).catch(error => {
      alert('Failed to add data');
    });
  }

  delete(link: string) {
    this.editClicked = false;
    this.newLink = link.replace('ide:3000', 'api.udicti.tk:8000/ide/api');
    if (confirm('Are you sure to delete ')) {
      this.projectService.deleteProject(this.newLink).then(value => {
        this.getAllProjects();
      }).catch(error => {
        alert('Failed to add data');
      });
    }
  }

}
