import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncubateeComponent } from './incubatee.component';

describe('IncubateeComponent', () => {
  let component: IncubateeComponent;
  let fixture: ComponentFixture<IncubateeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncubateeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncubateeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
