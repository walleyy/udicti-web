import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManServicesComponent } from './man-services.component';

describe('ManServicesComponent', () => {
  let component: ManServicesComponent;
  let fixture: ComponentFixture<ManServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
