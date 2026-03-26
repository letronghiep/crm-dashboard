import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { CompaniesComponent } from './companies.component';
import { DropdownModule } from 'primeng/dropdown';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from 'src/app/shared/share.module';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [CompaniesComponent, EditCompanyComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    TagModule,
    AvatarModule,
    DividerModule,
    TabViewModule,
    ChipModule,
    TooltipModule,
    DropdownModule,
    MultiSelectModule,
    ReactiveFormsModule,
    SharedModule,
    InputNumberModule
  ],
  exports: [CompaniesComponent],
})
export class CompaniesModule {}
