import { Component } from '@angular/core';

export interface Deal {
  id: number;
  title: string;
  amount: string;
  company: string;
  owner: string;
  ownerInitials: string;
  stage: 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  progress: number;
  expectedClose: string;
  activities: number;
}

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css'],
})
export class DealsComponent {
  searchText = '';
  selectedDeal: Deal | null = null;

  deals: Deal[] = [
    { id: 1, title: 'CRM Upgrade', amount: '$25,000', company: 'ABC Corp.', owner: 'John Doe', ownerInitials: 'JD', stage: 'Lead', progress: 20, expectedClose: 'May 02', activities: 2 },
    { id: 2, title: 'Cloud Migration', amount: '$48,000', company: 'NextTech', owner: 'Anna Smith', ownerInitials: 'AS', stage: 'Proposal', progress: 55, expectedClose: 'May 15', activities: 4 },
    { id: 3, title: 'ERP Integration', amount: '$32,000', company: 'Delta Solutions', owner: 'Oscar M.', ownerInitials: 'OM', stage: 'Negotiation', progress: 75, expectedClose: 'Apr 28', activities: 6 },
    { id: 4, title: 'Security Audit', amount: '$12,500', company: 'ZenGlobal', owner: 'Jane M.', ownerInitials: 'JM', stage: 'Qualified', progress: 40, expectedClose: 'Jun 01', activities: 1 },
  ];

  stages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Won'];

  get filtered(): Deal[] {
    return this.deals.filter(d =>
      d.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      d.company.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectDeal(deal: Deal): void {
    this.selectedDeal = this.selectedDeal?.id === deal.id ? null : deal;
  }

  stageSeverity(stage: string): string {
    const map: Record<string, string> = {
      Lead: 'danger',
      Qualified: 'warning',
      Proposal: 'info',
      Negotiation: 'info',
      Won: 'success',
      Lost: 'secondary',
    };
    return map[stage] || 'info';
  }

  stageClass(stage: string): string {
    const map: Record<string, string> = {
      Lead: 'stage-lead',
      Qualified: 'stage-qualified',
      Proposal: 'stage-proposal',
      Negotiation: 'stage-negotiation',
      Won: 'stage-won',
      Lost: 'stage-lost',
    };
    return map[stage] || '';
  }

  stageIndex(stage: string): number {
    return this.stages.indexOf(stage);
  }
}
