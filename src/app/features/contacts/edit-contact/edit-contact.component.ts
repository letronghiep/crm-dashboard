import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Company } from 'src/app/core/models/company.interface';
import { Employee } from 'src/app/core/models/employee';
import { CompaniesService } from 'src/app/core/services/companies/companies.service';
import { EmployeeService } from 'src/app/core/services/employees/employee.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  employees: Employee[] = [];
  companies: Company[] = [];
  statusOptions = [
    { label: 'Lead', value: 'lead' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'Customer', value: 'customer' },
  ];
  tagOptions = [
    { name: 'VIP' },
    { name: 'Lead' },
    { name: 'Contacted' },
    { name: 'Long-Term' },
    { name: 'Bogus' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private employeeService: EmployeeService,
    private companiesService: CompaniesService,
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(/^\S(?:.*\S)?$/)]],
      lastName: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(/^\S(?:.*\S)?$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4}[\s\-]?)?(\(?\d{1,4}\)?[\s\-]?)?\d{6,10}$/)]],
      position: ['', [Validators.required]],
      linkedin: [''],
      companyId: [null, [Validators.required]],
      ownerId: [null, [Validators.required]],
      status: ['', [Validators.required]],
      tags: [[]],
    });
  }

  ngOnInit(): void {
    forkJoin({
      employees: this.employeeService.getEmployees(),
      companies: this.companiesService.getCompanies(),
    }).subscribe(({ employees, companies }) => {
      this.employees = employees.contents;
      this.companies = companies.contents;
    });

    const data = this.dialogConfig?.data;
    if (data) {
      this.contactForm.patchValue({
        ...data,
        ownerId: data.owner?.id ?? null,
        companyId: data.company?.id ?? null,
      });
    }
  }

  f(name: string) {
    return this.contactForm.get(name);
  }

  isInvalid(name: string): boolean {
    const ctrl = this.f(name);
    return !!(ctrl?.invalid && (ctrl.touched || ctrl.dirty));
  }

  onSave(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.contactForm.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
