import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTimeComponent } from './report-time.component';

describe('ReportTimeComponent', () => {
  let component: ReportTimeComponent;
  let fixture: ComponentFixture<ReportTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportTimeComponent]
    });
    fixture = TestBed.createComponent(ReportTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
