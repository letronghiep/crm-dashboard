import { Employee } from './employee';
import { Company } from './company.interface';

export interface ContactWithOwner extends Omit<Contact, 'ownerId' | 'companyId'> {
  owner: Employee | null;
  company: Company | null;
}

export interface Contact {
  id: number;
  firstName: string;
  lastName?: string;

  email?: string;
  phone?: string;

  position?: string;
  linkedin?: string;

  companyId: number; // ObjectId (Company)

  ownerId: number; // ObjectId (Employee)

  status: 'lead' | 'contacted' | 'qualified' | 'customer';

  tags?: string[];
}
