import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/share.module';
import { ProjectsComponent } from './projects.component';
import { DragDropModule } from 'primeng/dragdrop';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { SingleProjectComponent } from './single-project/single-project.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ReportTimeComponent } from './task-detail/report-time/report-time.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    TaskDetailComponent,
    SingleProjectComponent,
    ReportTimeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    ButtonModule,
    AvatarModule,
    ProjectsRoutingModule,
    OverlayPanelModule,
  ],
})
export class ProjectsModule {}
