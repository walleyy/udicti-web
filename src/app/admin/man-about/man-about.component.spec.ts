import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManAboutComponent } from './man-about.component';

describe('ManAboutComponent', () => {
  let component: ManAboutComponent;
  let fixture: ComponentFixture<ManAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
