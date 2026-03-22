import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestEventComponent } from './nearest-event.component';

describe('NearestEventComponent', () => {
  let component: NearestEventComponent;
  let fixture: ComponentFixture<NearestEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NearestEventComponent]
    });
    fixture = TestBed.createComponent(NearestEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
