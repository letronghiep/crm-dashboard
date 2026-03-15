import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { SharedModule } from 'src/app/shared/share.module';
import { DashboardAdminComponent } from './dashboard-admin.component';

@NgModule({
  declarations: [DashboardAdminComponent],
  imports: [CommonModule, SharedModule, LayoutsModule, AppRoutingModule],
})
export class DashboardAdminModule {}
