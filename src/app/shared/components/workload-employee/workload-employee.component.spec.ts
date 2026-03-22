import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadEmployeeComponent } from './workload-employee.component';

describe('WorkloadEmployeeComponent', () => {
  let component: WorkloadEmployeeComponent;
  let fixture: ComponentFixture<WorkloadEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkloadEmployeeComponent]
    });
    fixture = TestBed.createComponent(WorkloadEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
