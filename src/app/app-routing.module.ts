import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './features/dashboard-admin/dashboard-admin.component';
import { CustomersComponent } from './features/customers/customers.component';
import { LayoutComponent } from './layouts/layout.component';
import { ProjectsComponent } from './features/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
