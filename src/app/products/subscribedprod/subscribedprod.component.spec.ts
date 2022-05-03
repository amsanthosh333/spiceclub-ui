import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedprodComponent } from './subscribedprod.component';

describe('SubscribedprodComponent', () => {
  let component: SubscribedprodComponent;
  let fixture: ComponentFixture<SubscribedprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
