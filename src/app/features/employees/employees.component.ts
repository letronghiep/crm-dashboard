import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employees/employee.service';
import { ThemeService } from 'src/app/layouts/theme.service';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [DialogService],
})
export class EmployeesComponent implements OnInit {
  activeIndex = 0;
  themeService: ThemeService;
  private destroy$ = new Subject<void>();
  employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$: Observable<Employee[]>;
  allEmployees: Employee[] = [];
  pagedEmployees: Employee[] = [];
  pageSize = 8;
  first = 0;
  selectedEmployee: Employee | null = null;
  items: MenuItem[];
  constructor(
    themeService: ThemeService,
    private employeeService: EmployeeService,
    private dialogService: DialogService,
  ) {
    this.themeService = themeService;
    this.employees$ = this.employeesSubject.asObservable();
    this.items = this.buildMenu();
  }

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees().pipe(
      takeUntil(this.destroy$),
      map((res) => res.contents),
    );
    this.employees$.subscribe((employees) => {
      this.allEmployees = employees;
      this.updatePage();
    });
  }
  buildMenu(empl?: Employee) {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.onEdit(empl),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.onDelete(empl),
      },
    ];
  }
  updatePage(): void {
    this.pagedEmployees = this.allEmployees.slice(
      this.first,
      this.first + this.pageSize,
    );
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.pageSize = event.rows;
    this.updatePage();
  }

  selectEmployee(emp: Employee): void {
    this.selectedEmployee = this.selectedEmployee?.id === emp.id ? null : emp;
  }

  minVal(a: number, b: number): number {
    return Math.min(a, b);
  }
  openMenu(event: Event, emp: Employee, menu: any) {
    // this.selectedEmployee = emp;
    this.items = this.buildMenu(emp);
    menu.toggle(event);
  }
  onEdit(empl?: Employee) {
    this.dialogService.open(EditEmployeeComponent, {
      header: empl ? 'Edit Employee' : 'Add Employee',
      width: '60%',
      data: empl ?? null,
    });
  }
  onDelete(empl?: Employee) {}
}
