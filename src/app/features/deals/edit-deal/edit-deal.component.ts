import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { Company } from 'src/app/core/models/company.interface';
import { Employee } from 'src/app/core/models/employee';
import { CompaniesService } from 'src/app/core/services/companies/companies.service';
import { EmployeeService } from 'src/app/core/services/employees/employee.service';

@Component({
  selector: 'app-edit-deal',
  templateUrl: './edit-deal.component.html',
  styleUrls: ['./edit-deal.component.css'],
})
export class EditDealComponent implements OnInit {
  dealForm: FormGroup;
  employees: Employee[] = [];
  companies: Company[] = [];

  stageOptions = [
    { label: 'Lead', value: 'lead' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'Proposal', value: 'proposal' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Won', value: 'closed_won' },
    { label: 'Lost', value: 'closed_lost' },
  ];

  currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'VND', value: 'VND' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private employeeService: EmployeeService,
    private companiesService: CompaniesService,
  ) {
    this.dealForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(/^\S(?:.*\S)?$/)]],
      value: [null, [Validators.required, Validators.min(0)]],
      currency: ['USD', [Validators.required]],
      companyId: [null, [Validators.required]],
      ownerId: [null, [Validators.required]],
      stage: ['', [Validators.required]],
      probability: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      expectedCloseDate: [null, [Validators.required]],
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
      this.dealForm.patchValue({
        ...data,
        ownerId: data.owner?.id ?? null,
        companyId: data.company?.id ?? null,
        expectedCloseDate: data.expectedCloseDate ? new Date(data.expectedCloseDate) : null,
      });
    }
  }

  f(name: string) { return this.dealForm.get(name); }

  isInvalid(name: string): boolean {
    const ctrl = this.f(name);
    return !!(ctrl?.invalid && (ctrl.touched || ctrl.dirty));
  }

  onSave(): void {
    if (this.dealForm.invalid) {
      this.dealForm.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.dealForm.value);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
