import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from 'src/app/shared/share.module';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeesComponent } from './employees.component';

@NgModule({
  declarations: [EmployeesComponent, EditEmployeeComponent],
  imports: [
    CommonModule,
    RouterModule,
    TabViewModule,
    ButtonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [EmployeesComponent],
})
export class EmployeesModule {}
