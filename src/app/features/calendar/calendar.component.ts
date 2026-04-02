import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import {
  CalendarOptions,
  EventClickArg,
  DateSelectArg,
  EventApi,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventComponent } from './add-event/add-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DialogService]
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: 3, // Show max 3 events, then "+X more"
    weekends: true,
    events: [],
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    moreLinkClick: 'popover',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
    },
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
    },
    locale: 'en',
    firstDay: 1,
  };

  currentEvents: EventApi[] = [];

  constructor(
    private translate: TranslateService,
    private dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.initializeCalendarTranslations();
    this.loadEvents();
    this.updateCalendarLocale();
  }

  initializeCalendarTranslations(): void {
    // Update translations after they are loaded
    this.calendarOptions.moreLinkText = (num) =>
      this.translate.instant('calendar.moreEvents', { count: num });
    
    this.calendarOptions.buttonText = {
      today: this.translate.instant('calendar.today'),
      month: this.translate.instant('calendar.month'),
      week: this.translate.instant('calendar.week'),
      day: this.translate.instant('calendar.day'),
    };
  }

  updateCalendarLocale(): void {
    const currentLang = this.translate.currentLang || this.translate.defaultLang || 'en';
    this.calendarOptions.locale = currentLang;
  }

  loadEvents(): void {
    // Sample events with multiple events on same days
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    this.calendarOptions.events = [
      {
        id: '1',
        title: 'Team Meeting',
        start: today.toISOString().split('T')[0] + 'T09:00:00',
        end: today.toISOString().split('T')[0] + 'T10:00:00',
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        textColor: '#ffffff',
      },
      {
        id: '2',
        title: 'Project Review',
        start: today.toISOString().split('T')[0] + 'T14:00:00',
        end: today.toISOString().split('T')[0] + 'T15:30:00',
        backgroundColor: '#8b5cf6',
        borderColor: '#8b5cf6',
        textColor: '#ffffff',
      },
      {
        id: '3',
        title: 'Client Call',
        start: today.toISOString().split('T')[0] + 'T16:00:00',
        end: today.toISOString().split('T')[0] + 'T17:00:00',
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        textColor: '#ffffff',
      },
      {
        id: '4',
        title: 'Code Review',
        start: today.toISOString().split('T')[0] + 'T11:00:00',
        end: today.toISOString().split('T')[0] + 'T12:00:00',
        backgroundColor: '#f59e0b',
        borderColor: '#f59e0b',
        textColor: '#ffffff',
      },
      {
        id: '5',
        title: 'Birthday Party',
        start: tomorrow.toISOString().split('T')[0],
        backgroundColor: '#ec4899',
        borderColor: '#ec4899',
        textColor: '#ffffff',
        allDay: true,
      },
      {
        id: '6',
        title: 'Workshop',
        start: tomorrow.toISOString().split('T')[0] + 'T10:00:00',
        end: tomorrow.toISOString().split('T')[0] + 'T12:00:00',
        backgroundColor: '#06b6d4',
        borderColor: '#06b6d4',
        textColor: '#ffffff',
      },
      {
        id: '7',
        title: 'Project Deadline',
        start: nextWeek.toISOString().split('T')[0],
        backgroundColor: '#ef4444',
        borderColor: '#ef4444',
        textColor: '#ffffff',
        allDay: true,
      },
      {
        id: '8',
        title: 'Presentation',
        start: nextWeek.toISOString().split('T')[0] + 'T14:00:00',
        end: nextWeek.toISOString().split('T')[0] + 'T16:00:00',
        backgroundColor: '#8b5cf6',
        borderColor: '#8b5cf6',
        textColor: '#ffffff',
      },
    ];
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    const ref = this.dialogService.open(AddEventComponent, {
      header: this.translate.instant('calendar.addEvent'),
      width: '600px',
      data: {
        date: selectInfo.startStr
      }
    });

    ref.onClose.subscribe((eventData: any) => {
      if (eventData) {
        calendarApi.addEvent({
          id: String(Date.now()),
          ...eventData
        });
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
    if (
      confirm(
        this.translate.instant('calendar.deleteEventConfirm', {
          title: clickInfo.event.title,
        }),
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]): void {
    // Events are managed by FullCalendar
  }

  addEvent(): void {
    const ref = this.dialogService.open(AddEventComponent, {
      header: this.translate.instant('calendar.addEvent'),
      width: '600px',
      data: {}
    });

    ref.onClose.subscribe((eventData: any) => {
      if (eventData) {
        // Get calendar API from the calendar options
        const calendarEl = document.querySelector('full-calendar');
        if (calendarEl) {
          const calendarApi = (calendarEl as any).getApi();
          if (calendarApi) {
            calendarApi.addEvent({
              id: String(Date.now()),
              ...eventData
            });
          }
        }
      }
    });
  }
}
