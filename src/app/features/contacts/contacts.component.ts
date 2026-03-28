import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs';
import { Company } from 'src/app/core/models/company.interface';
import { ContactWithOwner } from 'src/app/core/models/contact.interface';
import { CompaniesService } from 'src/app/core/services/companies/companies.service';
import { ContactsService } from 'src/app/core/services/contacts/contacts.service';
import { ThemeService } from 'src/app/layouts/theme.service';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class ContactsComponent implements OnInit {
  searchText = '';
  themeService: ThemeService;
  sortOptions = [
    { label: 'Owner', value: 'owner' },
    { label: 'Z - A', value: 'desc' },
  ];
  sortOrder = 'owner';
  private contactSubject = new BehaviorSubject<ContactWithOwner[]>([]);
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  private destroy$ = new Subject<void>();
  contacts$: Observable<ContactWithOwner[]>;
  companies$: Observable<Company[]>;
  constructor(
    themeService: ThemeService,
    private contactsService: ContactsService,
    private companiesService: CompaniesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private ref: DialogService
  ) {
    this.themeService = themeService;
    this.contacts$ = this.contactSubject.asObservable();
    this.companies$ = this.companiesSubject.asObservable();
  }

  ngOnInit(): void {
    this.contacts$ = this.contactsService.getContactsWithOwner().pipe(
      takeUntil(this.destroy$),
      map((res) => res),
    );
    this.companies$ = this.companiesService.getCompanies().pipe(
      takeUntil(this.destroy$),
      map((res) =>
        res.contents.map((item) => ({
          ...item,
          label: item.id,
          formattedLabel: item.name + ' - ' + item.id,
        })),
      ),
    );
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      VIP: 'status-vip',
      Lead: 'status-lead',
      Contacted: 'status-contacted',
      'Long-Term': 'status-longterm',
    };
    return map[status] || '';
  }

  statusSeverity(status: string): string {
    const map: Record<string, string> = {
      VIP: 'warning',
      Lead: 'danger',
      Contacted: 'success',
      'Long-Term': 'info',
    };
    return map[status] || 'info';
  }
  onRemove(id: number) {
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
  addContact() {
    this.ref.open(EditContactComponent, {
      width: '60%',
      header: 'Add Contact'
    })
  }
  editContact(contact: ContactWithOwner) {
    this.ref.open(EditContactComponent, {
      width: '60%',
      header: 'Edit Contact',
      data: contact
    })
  }
}
