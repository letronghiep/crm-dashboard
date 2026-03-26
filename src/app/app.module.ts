import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardAdminModule } from './features/dashboard-admin/dashboard-admin.module';
import { CompaniesModule } from './features/companies/companies.module';
import { ContactsModule } from './features/contacts/contacts.module';
import { DealsModule } from './features/deals/deals.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/share.module';
import { CustomersComponent } from './features/customers/customers.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { EmployeesComponent } from './features/employees/employees.component';
@NgModule({
  declarations: [AppComponent, CustomersComponent, ProjectsComponent, EmployeesComponent],
  imports: [
    BrowserModule,
    SharedModule,
    LayoutsModule,
    DashboardAdminModule,
    CompaniesModule,
    ContactsModule,
    DealsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
