import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickorderComponent } from './quickorder.component';

describe('QuickorderComponent', () => {
  let component: QuickorderComponent;
  let fixture: ComponentFixture<QuickorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
