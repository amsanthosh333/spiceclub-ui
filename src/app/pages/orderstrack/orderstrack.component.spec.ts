import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderstrackComponent } from './orderstrack.component';

describe('OrderstrackComponent', () => {
  let component: OrderstrackComponent;
  let fixture: ComponentFixture<OrderstrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderstrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderstrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
