import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './features/customers/customers.component';
import { DashboardAdminComponent } from './features/dashboard-admin/dashboard-admin.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { LayoutComponent } from './layouts/layout.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
