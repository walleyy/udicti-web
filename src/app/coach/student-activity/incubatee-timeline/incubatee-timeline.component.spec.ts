import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncubateeTimelineComponent } from './incubatee-timeline.component';

describe('IncubateeTimelineComponent', () => {
  let component: IncubateeTimelineComponent;
  let fixture: ComponentFixture<IncubateeTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncubateeTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncubateeTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
