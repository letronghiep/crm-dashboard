import { InputSwitchModule } from 'primeng/inputswitch';
import { StyleClassModule } from 'primeng/styleclass';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTopbarComponent } from './components/app-topbar/app-topbar.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/share.module';
import { WorkloadEmployeeComponent } from './components/workload-employee/workload-employee.component';
import { ButtonModule } from 'primeng/button';
// import { AppConfigurator } from './components/app-topbar/app.configurator';
@NgModule({
  declarations: [
    AppTopbarComponent,
    LayoutComponent,
    WorkloadEmployeeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StyleClassModule,
    InputSwitchModule,
    FormsModule,
    SharedModule,
    ButtonModule
  ],
  exports: [AppTopbarComponent, LayoutComponent, WorkloadEmployeeComponent],
})
export class LayoutsModule {}
