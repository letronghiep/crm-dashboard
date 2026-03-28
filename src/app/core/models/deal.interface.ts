import { Company } from './company.interface';
import { Employee } from './employee';

export interface DealWithOwner extends Omit<Deal, 'ownerId' | 'companyId'> {
  owner: Employee | null;
  company: Company | null;
}
export interface Deal {
  id: number;
  title: string;
  value: number;
  currency: string;
  companyId: number; // ObjectId
  contactIds: number[]; // ObjectId
  ownerId: number;
  ownerInitials: string;
  stage:
    | 'lead'
    | 'qualified'
    | 'proposal'
    | 'negotiation'
    | 'closed_won'
    | 'closed_lost';
  probability?: number; // 0 - 100

  expectedCloseDate?: Date;
}
