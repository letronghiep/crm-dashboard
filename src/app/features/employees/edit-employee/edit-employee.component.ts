import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { Employee } from 'src/app/core/models/employee';
import { EmployeeService } from 'src/app/core/services/employees/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  managers: Employee[] = [];

  roleOptions = [
    { label: 'Junior', value: 'Junior' },
    { label: 'Middle', value: 'Middle' },
    { label: 'Senior', value: 'Senior' },
  ];

  departmentOptions = [
    { label: 'Design', value: 1 },
    { label: 'Engineering', value: 2 },
    { label: 'Product', value: 3 },
    { label: 'QA', value: 4 },
    { label: 'DevOps', value: 5 },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private employeeService: EmployeeService,
  ) {
    this.employeeForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(/^\S(?:.*\S)?$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+?\d{1,4}[\s\-]?)?(\(?\d{1,4}\)?[\s\-]?)?\d{6,10}$/,
          ),
        ],
      ],
      age: [
        null,
        [Validators.required, Validators.min(18), Validators.max(65)],
      ],
      avatar: [''],
      exp: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      role: ['', [Validators.required]],
      position: ['', [Validators.required]],
      department: [null, [Validators.required]],
      managerId: [null],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((res) => {
      this.managers = res.contents;
    });

    const data: Employee = this.dialogConfig?.data;
    if (data?.id) {
      this.isEditMode = true;
      this.employeeForm.patchValue(data);
    }
  }

  f(name: string) {
    return this.employeeForm.get(name);
  }

  isInvalid(name: string): boolean {
    const ctrl = this.f(name);
    return !!(ctrl?.invalid && (ctrl.touched || ctrl.dirty));
  }

  onResetPassword(): void {
    // trigger reset password flow
    console.log('Reset password for', this.dialogConfig?.data?.id);
  }

  onSave(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.employeeForm.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
