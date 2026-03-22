import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/core/models/employee';

@Component({
  selector: 'app-workload-employee',
  templateUrl: './workload-employee.component.html',
  styleUrls: ['./workload-employee.component.css'],
})
export class WorkloadEmployeeComponent implements OnInit {
  @Input() isDarkMode: boolean = false;
  @Input() workload: Employee[] = [];
  // employees: Employee[] = [];
  ngOnInit(): void {
    console.log(this.workload);
    // this.employees
  }
  getExpRingStyle(exp: number) {
    const clamped = Math.max(0, Math.min(100, exp ?? 0));
    const endDeg = (clamped / 100) * 360;
    return {
      background: `conic-gradient(#3b82f6 0deg ${endDeg}deg, #e5e7eb ${endDeg}deg 360deg)`,
    };
  }
}
