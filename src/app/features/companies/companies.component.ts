import { Component, OnInit } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ThemeService } from 'src/app/layouts/theme.service';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  takeUntil,
} from 'rxjs';
import { Company } from 'src/app/core/models/company.interface';
import { CompaniesService } from 'src/app/core/services/companies/companies.service';
import { EmployeeService } from 'src/app/core/services/employees/employee.service';
import { Employee } from 'src/app/core/models/employee';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class CompaniesComponent implements OnInit {
  searchText = '';
  selectedIndustry = '';
  selectedOwner = '';
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  // sortOrder = 'A - Z';
  sortOptions = [
    { label: 'A - Z', value: 'asc' },
    { label: 'Z - A', value: 'desc' },
  ];

  sortOrder = 'asc';
  companies: Company[] = [];
  companies$: Observable<Company[]>;
  private readonly destroy$ = new Subject<void>();
  selectedCompany: Company | null = null;
  selectedCompanies: Company[] = [];
  currentCompanies: Company[] = [];
  employees$: Observable<Employee[]>;
  private employeeSubject = new BehaviorSubject<Employee[]>([]);
  // filterdData
  themeService: ThemeService;
  constructor(
    themService: ThemeService,
    private ref: DialogService,
    private companiesService: CompaniesService,
    private employeesService: EmployeeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.themeService = themService;
    this.companies$ = this.companiesSubject.asObservable();
    this.employees$ = this.employeeSubject.asObservable();
  }

  ngOnInit(): void {
    const companies$ = this.companiesService.getCompanies().pipe(
      map((res) => res.contents),
      catchError(() => of([] as Company[])),
    );

    const employees$ = this.employeesService.getEmployees().pipe(
      map((res) => res.contents),
      catchError(() => of([] as Employee[])),
    );

    combineLatest([companies$, employees$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([companies, employees]) => {
        const avatarMap = new Map<number, string>(
          employees.map((e) => [e.id, e.avatar]),
        );

        this.currentCompanies = companies
          .filter((c) =>
            c.name
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase()),
          )
          .map((c) => ({
            ...c,
            ownerAvatar: avatarMap.get(c.ownerId) ?? null,
          }));

        this.employeeSubject.next(employees);
        this.companiesSubject.next(this.currentCompanies);
      });
  }
  addCompany() {
    this.ref.open(EditCompanyComponent, {
      width: '60%',
      header: 'Add Company',
      data: { employees: this.employeeSubject.getValue() },
    });
  }

  // Checkbox đơn — toggle tick + mở/đóng detail
  toggleSelect(company: Company): void {
    const alreadySelected = this.isChecked(company);
    if (alreadySelected) {
      this.selectedCompanies = this.selectedCompanies.filter(
        (c) => c.id !== company.id,
      );
      if (this.selectedCompany?.id === company.id) {
        this.selectedCompany = null;
      }
    } else {
      this.selectedCompanies = [...this.selectedCompanies, company];
      this.selectedCompany = company;
    }
  }

  // Select all — chỉ tick, không mở detail
  get allSelected(): boolean {
    return (
      this.currentCompanies.length > 0 &&
      this.currentCompanies.every((c) => this.isChecked(c))
    );
  }

  get someSelected(): boolean {
    return this.selectedCompanies.length > 0 && !this.allSelected;
  }

  toggleSelectAll(checked: boolean): void {
    if (checked) {
      // Merge filtered vào selectedCompanies, không trùng
      const ids = new Set(this.selectedCompanies.map((c) => c.id));
      this.selectedCompanies = [
        ...this.selectedCompanies,
        ...this.currentCompanies.filter((c) => !ids.has(c.id)),
      ];
    } else {
      const filteredIds = new Set(this.currentCompanies.map((c) => c.id));
      this.selectedCompanies = this.selectedCompanies.filter(
        (c) => !filteredIds.has(c.id),
      );
      // Nếu detail đang mở mà company đó bị deselect thì đóng
      if (this.selectedCompany && filteredIds.has(this.selectedCompany.id)) {
        this.selectedCompany = null;
      }
    }
  }

  isChecked(company: Company): boolean {
    return this.selectedCompanies.some((c) => c.id === company.id);
  }

  closeDetail(): void {
    if (this.selectedCompany) {
      this.selectedCompanies = this.selectedCompanies.filter(
        (c) => c.id !== this.selectedCompany!.id,
      );
    }
    this.selectedCompany = null;
  }

  isSelected(company: Company): boolean {
    return this.selectedCompany?.id === company.id;
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedIndustry = '';
    this.selectedOwner = '';
  }

  editCompany(company: Company) {
    this.ref.open(EditCompanyComponent, {
      width: '60%',
      header: 'Edit company',
      data: { ...company, employees: this.employeeSubject.getValue() },
    });
  }
  removeCompany(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
