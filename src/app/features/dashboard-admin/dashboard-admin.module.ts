import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/share.module';
import { DashboardAdminComponent } from './dashboard-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { NearestEventComponent } from './nearest-event/nearest-event.component';
import { EditNearestEventComponent } from './nearest-event/edit-nearest-event/edit-nearest-event.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [
    DashboardAdminComponent,
    NearestEventComponent,
    EditNearestEventComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutsModule,
    AppRoutingModule,
    HttpClientModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardAdminRoutingModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    DynamicDialogModule,
  ],
})
export class DashboardAdminModule {}
