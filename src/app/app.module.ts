import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesModule } from './features/companies/companies.module';
import { ContactsModule } from './features/contacts/contacts.module';
import { DashboardAdminModule } from './features/dashboard-admin/dashboard-admin.module';
import { DealsModule } from './features/deals/deals.module';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/share.module';
import { EmployeesModule } from './features/employees/employees.module';
import { ProjectsModule } from './features/projects/projects.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from './core/services/custom-loader.service';
import { CalendarsModule } from './features/calendar/calendar.module';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    LayoutsModule,
    DashboardAdminModule,
    CompaniesModule,
    ContactsModule,
    DealsModule,
    EmployeesModule,
    ProjectsModule,
    CalendarsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new CustomLoader(http),
        deps: [HttpClient],
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('accessToken'),
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
