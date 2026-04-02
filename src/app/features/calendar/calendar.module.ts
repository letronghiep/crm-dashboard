import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from 'src/app/shared/share.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddEventComponent } from './add-event/add-event.component';

@NgModule({
  declarations: [CalendarComponent, AddEventComponent],
  imports: [CommonModule, SharedModule, FullCalendarModule],
})
export class CalendarsModule {}
