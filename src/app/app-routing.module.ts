import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './features/customers/customers.component';
import { DashboardAdminComponent } from './features/dashboard-admin/dashboard-admin.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { CompaniesComponent } from './features/companies/companies.component';
import { ContactsComponent } from './features/contacts/contacts.component';
// import { DealsComponent } from './features/deals/deals.component';
import { LayoutComponent } from './layouts/layout.component';
import { DealsComponent } from './features/deals/deals.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardAdminComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'deals',
        component: DealsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
