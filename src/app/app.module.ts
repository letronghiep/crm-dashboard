import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardAdminModule } from './features/dashboard-admin/dashboard-admin.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/share.module';
import { CustomersComponent } from './features/customers/customers.component';
import { ProjectsComponent } from './features/projects/projects.component';
@NgModule({
  declarations: [AppComponent, CustomersComponent, ProjectsComponent],
  imports: [
    BrowserModule,
    SharedModule,
    LayoutsModule,
    DashboardAdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
