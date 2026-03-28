import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ContactsComponent } from './contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { SharedModule } from 'src/app/shared/share.module';

@NgModule({
  declarations: [ContactsComponent, EditContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TagModule,
    AvatarModule,
    ChipModule,
    TooltipModule,
    DropdownModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [ContactsComponent],
})
export class ContactsModule {}
