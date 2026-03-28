import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesModule } from './features/companies/companies.module';
import { ContactsModule } from './features/contacts/contacts.module';
import { DashboardAdminModule } from './features/dashboard-admin/dashboard-admin.module';
import { DealsModule } from './features/deals/deals.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/share.module';
import { EmployeesModule } from './features/employees/employees.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    LayoutsModule,
    DashboardAdminModule,
    CompaniesModule,
    ContactsModule,
    DealsModule,
    EmployeesModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
