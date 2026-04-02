import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { WorkloadEmployeeComponent } from './components/workload-employee/workload-employee.component';
import { WorkloadProjectComponent } from './components/workload-project/workload-project.component';
import { ToCapitalizePipe } from './pipes/to-capitalize.pipe';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
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
    RouterModule,
    ButtonModule,
    CardModule,
    CalendarModule,
    FileUploadModule,
    ToastModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DynamicDialogModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    ConfirmDialogModule,
    TabViewModule,
    DividerModule,
    MenuModule,
    TranslateModule
  ],
  exports: [
    SidebarComponent,
    WorkloadEmployeeComponent,
    WorkloadProjectComponent,
    SkeletonLoadingComponent,
    UploadFileComponent,
    ToCapitalizePipe,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    TabViewModule,
    DividerModule,
    MultiSelectModule,
    DynamicDialogModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    MenuModule,
    TranslateModule
  ],
})
export class SharedModule {}
