import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layouts/layout.component';
import { NearestEventComponent } from './nearest-event/nearest-event.component';
import { EditNearestEventComponent } from './nearest-event/edit-nearest-event/edit-nearest-event.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard/nearest-event',
        component: NearestEventComponent,
      },
      {
        path: 'dashboard/nearest-event/add',
        component: EditNearestEventComponent,
      },
      {
        path: 'dashboard/nearest-event/:id',
        component: EditNearestEventComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DashboardAdminRoutingModule {}
