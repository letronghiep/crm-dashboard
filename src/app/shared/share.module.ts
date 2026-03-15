import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
@NgModule({
  declarations: [
    SidebarComponent,
    EmployeeCardComponent,
    EmployeeCardComponent,
  ],
  imports: [CommonModule, ButtonModule, RouterModule, CardModule],
  exports: [SidebarComponent, EmployeeCardComponent],
})
export class SharedModule {}
