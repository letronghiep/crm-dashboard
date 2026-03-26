import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { WorkloadEmployeeComponent } from './components/workload-employee/workload-employee.component';
import { WorkloadProjectComponent } from './components/workload-project/workload-project.component';
import { ToCapitalizePipe } from './pipes/to-capitalize.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    SidebarComponent,
    WorkloadEmployeeComponent,
    WorkloadProjectComponent,
    SkeletonLoadingComponent,
    ToCapitalizePipe,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    CardModule,
    CalendarModule,
    FileUploadModule,
    ToastModule,
  ],
  exports: [
    SidebarComponent,
    WorkloadEmployeeComponent,
    WorkloadProjectComponent,
    SkeletonLoadingComponent,
    UploadFileComponent,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class SharedModule {}
