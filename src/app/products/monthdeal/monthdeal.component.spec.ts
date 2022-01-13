import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthdealComponent } from './monthdeal.component';

describe('MonthdealComponent', () => {
  let component: MonthdealComponent;
  let fixture: ComponentFixture<MonthdealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthdealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
