import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { DealWithOwner } from 'src/app/core/models/deal.interface';
import { DealsService } from 'src/app/core/services/deals/deals.service';
import { ThemeService } from 'src/app/layouts/theme.service';
import { EditDealComponent } from './edit-deal/edit-deal.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class DealsComponent implements OnInit {
  searchText = '';
  selectedDeal: DealWithOwner | null = null;
  private destroy$ = new Subject<void>();
  dealSubject = new BehaviorSubject<DealWithOwner[]>([]);
  deals$: Observable<DealWithOwner[]>;
  pagedDeals: DealWithOwner[] = [];
  allDeals: DealWithOwner[] = [];
  pageSize = 5;
  first = 0;
  themeService: ThemeService;
  stages = ['lead', 'qualified', 'proposal', 'negotiation', 'closed_won'];
  constructor(
    themeService: ThemeService,
    private dealsService: DealsService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {
    this.themeService = themeService;
    this.deals$ = this.dealSubject.asObservable();
  }
  ngOnInit(): void {
    this.deals$ = this.dealsService.getDeals().pipe(
      takeUntil(this.destroy$),
      map((res) => res.contents),
      catchError((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to load deals',
          detail: err.message,
        });
        return of([]);
      }),
    );
    this.deals$.subscribe(deals => {
      this.allDeals = deals;
      this.updatePage();
    });
  }

  updatePage(): void {
    this.pagedDeals = this.allDeals.slice(this.first, this.first + this.pageSize);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.pageSize = event.rows;
    this.updatePage();
    this.selectedDeal = null;
  }
  selectDeal(deal: DealWithOwner): void {
    this.selectedDeal = this.selectedDeal?.id === deal.id ? null : deal;
  }

  stageSeverity(stage: string): string {
    const map: Record<string, string> = {
      lead: 'danger',
      qualified: 'warning',
      proposal: 'info',
      negotiation: 'info',
      closed_won: 'success',
      closed_lost: 'secondary',
    };
    return map[stage] || 'info';
  }

  stageClass(stage: string): string {
    const map: Record<string, string> = {
      lead: 'stage-lead',
      qualified: 'stage-qualified',
      proposal: 'stage-proposal',
      negotiation: 'stage-negotiation',
      closed_won: 'stage-won',
      closed_lost: 'stage-lost',
    };
    return map[stage] || '';
  }

  stageIndex(stage: string): number {
    return this.stages.indexOf(stage);
  }

  stageLabel(stage: string): string {
    const map: Record<string, string> = {
      lead: 'Lead',
      qualified: 'Qualified',
      proposal: 'Proposal',
      negotiation: 'Negotiation',
      closed_won: 'Won',
      closed_lost: 'Lost',
    };
    return map[stage] || stage;
  }
  addDeal() {
    this.dialogService.open(EditDealComponent, {
      header: this.translate.instant('deals.addDeal'),
      width: '60%',
    });
  }

  editDeal(deal: DealWithOwner) {
    this.dialogService.open(EditDealComponent, {
      header: this.translate.instant('deals.editDeal'),
      width: '60%',
      data: deal,
    });
  }
}

