import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashpgComponent } from './splashpg.component';

describe('SplashpgComponent', () => {
  let component: SplashpgComponent;
  let fixture: ComponentFixture<SplashpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
