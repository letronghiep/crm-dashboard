import { Component } from '@angular/core';

export interface Contact {
  id: number;
  name: string;
  initials: string;
  company: string;
  email: string;
  status: 'VIP' | 'Lead' | 'Contacted' | 'Long-Term';
  lastActivity: string;
  owner: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent {
  searchText = '';

  contacts: Contact[] = [
    { id: 1, name: 'John Doe', initials: 'JD', company: 'ABC Corp.', email: 'john.doe@abccorp.com', status: 'VIP', lastActivity: 'Mo, 14 Apr 2025', owner: 'EY' },
    { id: 2, name: 'Anna Smith', initials: 'AS', company: 'ABC Corp.', email: 'anna.smith@abccorp.com', status: 'Lead', lastActivity: 'Vons, 09 Apr 2025', owner: 'JD' },
    { id: 3, name: 'Mark Brown', initials: 'MB', company: 'Next Tech', email: 'jane-miller@nexttech.com', status: 'Contacted', lastActivity: 'Vons, 09 Apr 2025', owner: 'JM' },
    { id: 4, name: 'Tom Green', initials: 'TG', company: 'Zen Global', email: 'tom.green@zenglobal.com', status: 'Lead', lastActivity: 'Vons, 09 Apr 2025', owner: 'OM' },
  ];

  get filtered(): Contact[] {
    return this.contacts.filter(c =>
      c.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      c.company.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      'VIP': 'status-vip',
      'Lead': 'status-lead',
      'Contacted': 'status-contacted',
      'Long-Term': 'status-longterm',
    };
    return map[status] || '';
  }

  statusSeverity(status: string): string {
    const map: Record<string, string> = {
      'VIP': 'warning',
      'Lead': 'danger',
      'Contacted': 'success',
      'Long-Term': 'info',
    };
    return map[status] || 'info';
  }
}
