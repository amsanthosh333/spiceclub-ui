import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysdealComponent } from './todaysdeal.component';

describe('TodaysdealComponent', () => {
  let component: TodaysdealComponent;
  let fixture: ComponentFixture<TodaysdealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysdealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
