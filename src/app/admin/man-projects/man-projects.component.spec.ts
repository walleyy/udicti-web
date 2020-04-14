import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManProjectsComponent } from './man-projects.component';

describe('ManProjectsComponent', () => {
  let component: ManProjectsComponent;
  let fixture: ComponentFixture<ManProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
