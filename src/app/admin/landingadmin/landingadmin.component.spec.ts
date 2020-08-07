import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingadminComponent } from './landingadmin.component';

describe('LandingadminComponent', () => {
  let component: LandingadminComponent;
  let fixture: ComponentFixture<LandingadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
