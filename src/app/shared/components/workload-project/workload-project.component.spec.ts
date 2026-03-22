import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadProjectComponent } from './workload-project.component';

describe('WorkloadProjectComponent', () => {
  let component: WorkloadProjectComponent;
  let fixture: ComponentFixture<WorkloadProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkloadProjectComponent]
    });
    fixture = TestBed.createComponent(WorkloadProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
