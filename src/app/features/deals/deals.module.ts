import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { DealsComponent } from './deals.component';
import { SharedModule } from 'src/app/shared/share.module';
import { PaginatorModule } from 'primeng/paginator';
import { EditDealComponent } from './edit-deal/edit-deal.component';

@NgModule({
  declarations: [DealsComponent, EditDealComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    TagModule,
    AvatarModule,
    DividerModule,
    TabViewModule,
    ProgressBarModule,
    TooltipModule,
    PaginatorModule,
    SharedModule
  ],
  exports: [DealsComponent],
})
export class DealsModule {}
