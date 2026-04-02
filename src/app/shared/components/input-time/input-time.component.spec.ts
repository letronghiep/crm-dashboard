import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimeComponent } from './input-time.component';

describe('InputTimeComponent', () => {
  let component: InputTimeComponent;
  let fixture: ComponentFixture<InputTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputTimeComponent]
    });
    fixture = TestBed.createComponent(InputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
